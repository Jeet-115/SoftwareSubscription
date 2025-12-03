import { useState } from "react";
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
  const [planType, setPlanType] = useState("trial");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
          color: "#FF69B4",
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
      <h1 className="mb-2 text-4xl font-bold text-slate-100 text-center">
        Choose Your Plan
      </h1>
      <p className="mb-8 text-sm text-slate-400 text-center">
        Test environment: Trial ₹2 / Renewal ₹1, each valid for 20 minutes.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          onClick={() => setPlanType("trial")}
          className={`rounded-xl border p-6 text-left text-sm transition-colors ${
            planType === "trial"
              ? "border-secondary-DEFAULT bg-slate-900/50 backdrop-blur-lg"
              : "border-slate-800/50 bg-slate-900/30 backdrop-blur-lg"
          }`}
        >
          <div className="mb-2 text-2xl font-semibold text-secondary-light flex items-center">
            <FiAward className="mr-3" /> Trial Plan
          </div>
          <div className="text-4xl font-bold text-slate-100">₹2</div>
          <div className="mt-2 text-xs text-slate-400">
            20-minute access for testing purposes.
          </div>
           {planType === "trial" && <FiCheck className="absolute top-4 right-4 text-secondary-light" size={20}/>}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          onClick={() => setPlanType("renewal")}
          className={`rounded-xl border p-6 text-left text-sm transition-colors ${
            planType === "renewal"
              ? "border-secondary-DEFAULT bg-slate-900/50 backdrop-blur-lg"
              : "border-slate-800/50 bg-slate-900/30 backdrop-blur-lg"
          }`}
        >
          <div className="mb-2 text-2xl font-semibold text-secondary-light flex items-center">
            <FiShoppingCart className="mr-3" /> Renewal Plan
          </div>
          <div className="text-4xl font-bold text-slate-100">₹1</div>
          <div className="mt-2 text-xs text-slate-400">
            Renew your 20-minute test access.
          </div>
          {planType === "renewal" && <FiCheck className="absolute top-4 right-4 text-secondary-light" size={20}/>}
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
          disabled={loading}
          className="rounded-md bg-secondary-DEFAULT px-8 py-3 text-lg font-bold text-white hover:bg-secondary-dark disabled:opacity-60 transition-colors"
        >
          {loading
            ? "Processing..."
            : planType === "trial"
            ? "Pay ₹2"
            : "Renew ₹1"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BuySubscription;
