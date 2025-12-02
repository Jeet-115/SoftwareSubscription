import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-emerald-700 bg-emerald-950/40 p-6 text-center shadow-xl">
          <h1 className="mb-2 text-2xl font-semibold text-emerald-200">
            Payment Successful
          </h1>
          <p className="mb-3 text-xs text-emerald-100">
            Your payment was successful. The subscription will activate once the
            Razorpay webhook is processed, usually within a few seconds.
          </p>
          <p className="mb-6 text-[11px] text-emerald-200/80">
            If the dashboard does not update immediately, refresh it after 10–20
            seconds.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-emerald-100 hover:bg-slate-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


