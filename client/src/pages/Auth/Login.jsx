import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
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
        className="w-full max-w-md rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg"
      >
        <h1 className="mb-2 text-[#6e6670] text-center text-3xl font-bold text-text-DEFAULT">
          Welcome Back
        </h1>
        <p className="mb-6 text-center text-sm text-text-light">
          Sign in to access your dashboard.
        </p>
        {error && (
          <div className="mb-4 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-text-light" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-md border border-secondary-dark/30 bg-neutral-DEFAULT/20 pl-10 pr-3 py-2 text-sm text-text-DEFAULT outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-text-light" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-md border border-secondary-dark/30 bg-neutral-DEFAULT/20 pl-10 pr-3 py-2 text-sm text-text-DEFAULT outline-none focus:border-primary-light transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-2 w-full text-[#6e6670] rounded-md bg-primary-DEFAULT px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-60 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-xs text-text-light">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-primary-light hover:text-primary-dark transition-colors"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
