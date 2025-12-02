import { useState } from "react";
import api from "../utils/axios";

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
          color: "#4f46e5",
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
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-slate-100">
        Buy / Renew Subscription
      </h1>
      <p className="mb-4 text-xs text-slate-400">
        Test environment: Trial ₹2 / Renewal ₹1, each valid for 20 minutes.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setPlanType("trial")}
          className={`rounded-lg border p-4 text-left text-sm ${
            planType === "trial"
              ? "border-indigo-500 bg-slate-900/70"
              : "border-slate-800 bg-slate-900/40"
          }`}
        >
          <div className="mb-1 text-slate-100">Trial Plan</div>
          <div className="text-xl font-semibold text-indigo-400">₹2</div>
          <div className="mt-1 text-[11px] text-slate-400">
            20-minute access for testing.
          </div>
        </button>
        <button
          type="button"
          onClick={() => setPlanType("renewal")}
          className={`rounded-lg border p-4 text-left text-sm ${
            planType === "renewal"
              ? "border-indigo-500 bg-slate-900/70"
              : "border-slate-800 bg-slate-900/40"
          }`}
        >
          <div className="mb-1 text-slate-100">Renewal Plan</div>
          <div className="text-xl font-semibold text-indigo-400">₹1</div>
          <div className="mt-1 text-[11px] text-slate-400">
            Renew your 20-minute test access.
          </div>
        </button>
      </div>
      <div className="mt-6">
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
        <button
          type="button"
          onClick={startPayment}
          disabled={loading}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading
            ? "Starting payment..."
            : planType === "trial"
            ? "Pay ₹2"
            : "Renew ₹1"}
        </button>
      </div>
    </div>
  );
};

export default BuySubscription;


