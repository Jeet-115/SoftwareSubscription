import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/30 p-6 shadow-xl backdrop-blur-lg"
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-100">
          Create Your Account
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Join us and start managing your devices.
        </p>
        {error && (
          <div className="mb-4 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name (Optional)"
              className="w-full rounded-md border border-slate-700/50 bg-slate-950/50 pl-10 pr-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <div className="relative">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-md border border-slate-700/50 bg-slate-950/50 pl-10 pr-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-md border border-slate-700/50 bg-slate-950/50 pl-10 pr-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full rounded-md border border-slate-700/50 bg-slate-950/50 pl-10 pr-3 py-2 text-sm text-slate-100 outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-light hover:text-primary-dark transition-colors"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
