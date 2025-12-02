import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

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
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <h1 className="mb-2 text-center text-2xl font-semibold text-slate-100">
            Create an account
          </h1>
          <p className="mb-6 text-center text-xs text-slate-400">
            Register to manage your software subscription.
          </p>
          {error && (
            <div className="mb-4 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


