import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiXCircle, FiArrowLeft } from "react-icons/fi";

const PaymentFailed = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md rounded-xl border border-red-700/50 bg-red-900/60 p-8 text-center shadow-xl backdrop-blur-lg"
      >
        <FiXCircle className="mx-auto mb-4 text-6xl text-red-400" />
        <h1 className="mb-2 text-3xl font-bold text-red-200">
          Payment Failed
        </h1>
        <p className="mb-6 text-sm text-red-100">
          The payment was cancelled or failed. You can try again to complete
          your subscription.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/buy"
            className="inline-flex items-center justify-center rounded-md bg-neutral-light/10 px-6 py-3 text-sm font-medium text-red-100 hover:bg-neutral-light/20 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Try Again
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
