import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md rounded-xl border border-emerald-700/50 bg-emerald-900/30 p-8 text-center shadow-xl backdrop-blur-lg"
      >
        <FiCheckCircle className="mx-auto mb-4 text-6xl text-emerald-400" />
        <h1 className="mb-2 text-3xl font-bold text-emerald-200">
          Payment Successful
        </h1>
        <p className="mb-3 text-sm text-emerald-100">
          Your payment was successful. The subscription will activate once the
          Razorpay webhook is processed, usually within a few seconds.
        </p>
        <p className="mb-6 text-xs text-emerald-200/80">
          If the dashboard does not update immediately, refresh it after 10–20
          seconds.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-slate-900/50 px-6 py-3 text-sm font-medium text-emerald-100 hover:bg-slate-800/50 transition-colors"
          >
            Go to Dashboard <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
