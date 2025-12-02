import { useEffect, useState } from "react";
import api from "../utils/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/auth/me");
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-300">
        {error}
      </div>
    );
  }

  const active = data?.subscriptionActive;
  const expiry = data?.subscriptionExpiry
    ? new Date(data.subscriptionExpiry)
    : null;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-slate-100">
        Welcome back, {data?.email}
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-200">
            Subscription Status
          </h2>
          <p className="text-xs text-slate-400">
            Plan:{" "}
            <span className="font-medium text-slate-100">
              {data?.subscriptionPlan || "None"}
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Status:{" "}
            <span
              className={`font-semibold ${
                active ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {active ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Expiry:{" "}
            <span className="font-medium text-slate-100">
              {expiry ? expiry.toLocaleString() : "N/A"}
            </span>
          </p>
          <p className="mt-3 text-[11px] text-slate-500">
            Test environment: subscriptions are valid for 20 minutes after
            payment.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-200">
            Next steps
          </h2>
          <ul className="list-inside list-disc text-xs text-slate-400">
            <li>Use the Buy / Renew button to start a test subscription.</li>
            <li>Open your Electron app once the subscription is active.</li>
            <li>
              Your account is{" "}
              <span className="font-semibold text-slate-100">
                {data?.isMaster ? "Master" : "Normal User"}
              </span>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


