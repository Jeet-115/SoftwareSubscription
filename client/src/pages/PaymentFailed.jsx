import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-red-700 bg-red-950/40 p-6 text-center shadow-xl">
          <h1 className="mb-2 text-2xl font-semibold text-red-200">
            Payment Failed
          </h1>
          <p className="mb-3 text-xs text-red-100">
            The payment was cancelled or failed. You can try again to complete
            your subscription.
          </p>
          <Link
            to="/buy"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-red-100 hover:bg-slate-800"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;


