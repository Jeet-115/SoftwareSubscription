import { useState, useEffect } from "react";
import api from "../utils/axios";
import { motion } from "framer-motion";
import { FiShoppingCart, FiAward, FiCheck } from "react-icons/fi";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-js")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const BuySubscription = () => {
  const [planType, setPlanType] = useState(null); // This is the eligible plan.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const me = await api.get("/auth/me");
        if (me.data && me.data.subscriptionPlan) {
          setPlanType("renewal");
        } else {
          setPlanType("trial");
        }
      } catch (err) {
        console.error("Could not fetch user info", err);
        setError("Could not determine your subscription status. Please try again later.");
      }
    };
    fetchUserSubscription();
  }, []);

  const startPayment = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        setError("Failed to load Razorpay SDK");
        setLoading(false);
        return;
      }

      const me = await api.get("/auth/me");
      const email = me.data.email;

      const res = await api.post("/subscription/create-order", {
        email,
        planType,
      });

      const order = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Software Subscription",
        description: "Test subscription",
        order_id: order.orderId,
        prefill: {
          email,
        },
        handler: function (response) {
          setMessage("Payment successful. Redirecting...");
          window.location.href = "/payment-success";
        },
        modal: {
          ondismiss: function () {
            window.location.href = "/payment-failed";
          },
        },
        theme: {
          color: "#357ABD",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="mx-auto max-w-5xl px-4 py-8"
    >
      <h1 className="mb-2 text-4xl font-bold text-[#6e6670] text-text-DEFAULT text-center">
        Choose Your Plan
      </h1>
      <p className="mb-8 text-sm text-text-light text-center">
        Test environment: Trial ₹2 / Renewal ₹1, each valid for 20 minutes.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.button
          whileHover={{ scale: planType === 'trial' ? 1.05 : 1 }}
          type="button"
          onClick={() => {}} // No-op, selection is automatic
          disabled={planType !== 'trial'}
          className={`rounded-xl border p-6 text-left text-sm transition-colors relative ${
            planType === "trial"
              ? "border-primary-DEFAULT bg-neutral-light/20 backdrop-blur-lg"
              : "border-secondary-dark/50 bg-neutral-light/10 backdrop-blur-lg opacity-50 cursor-not-allowed"
          }`}
        >
          <div className="mb-2 text-2xl font-semibold text-primary-light flex items-center">
            <FiAward className="mr-3" /> Yearly Plan
          </div>
          <div className="text-4xl font-bold text-[#6e6670] text-text-DEFAULT">₹1250</div>
          <div className="mt-2 text-xs text-text-light">
            1 year access from the day of purchasing.
          </div>
           {planType === "trial" && <FiCheck className="absolute top-4 right-4 text-primary-light" size={20}/>}
        </motion.button>
        <motion.button
          whileHover={{ scale: planType === 'renewal' ? 1.05 : 1 }}
          type="button"
          onClick={() => {}} // No-op, selection is automatic
          disabled={planType !== 'renewal'}
          className={`rounded-xl border p-6 text-left text-sm transition-colors relative ${
            planType === "renewal"
              ? "border-primary-DEFAULT bg-neutral-light/20 backdrop-blur-lg"
              : "border-secondary-dark/50 bg-neutral-light/10 backdrop-blur-lg opacity-50 cursor-not-allowed"
          }`}
        >
          <div className="mb-2 text-2xl font-semibold text-primary-light flex items-center">
            <FiShoppingCart className="mr-3" /> Renewal Plan
          </div>
          <div className="text-4xl font-bold text-[#6e6670] text-text-DEFAULT">₹1000</div>
          <div className="mt-2 text-xs text-text-light">
            Renew your 1 year plan to extend 1 more year.
          </div>
          {planType === "renewal" && <FiCheck className="absolute top-4 right-4 text-primary-light" size={20}/>}
        </motion.button>
      </div>
      <div className="mt-8 text-center">
        {error && (
          <div className="mb-3 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-3 rounded-md border border-emerald-700 bg-emerald-950 px-3 py-2 text-xs text-emerald-200">
            {message}
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={startPayment}
          disabled={loading || !planType}
          className="rounded-md text-[#6e6670] bg-primary-DEFAULT px-8 py-3 text-lg font-bold  hover:bg-primary-dark disabled:opacity-60 transition-colors"
        >
          {loading
            ? "Processing..."
            : planType === "trial"
            ? "Pay ₹1250"
            : "Renew ₹1000"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BuySubscription;
