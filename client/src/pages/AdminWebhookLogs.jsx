import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiActivity, FiAlertTriangle, FiCheck, FiX, FiClock } from "react-icons/fi";

const AdminWebhookLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { adminKey } = useAuth();

  useEffect(() => {
    const load = async () => {
      setError("");

      if (!adminKey) {
        setError("You are not authorized to view webhook logs.");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/subscription/admin/webhook-logs", {
          headers: {
            "x-admin-key": adminKey,
          },
        });
        setLogs(res.data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to load webhook logs. Check admin access."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [adminKey]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-text-DEFAULT">
        <FiActivity className="animate-spin text-4xl text-primary-DEFAULT" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="mx-auto max-w-7xl px-4 py-8"
    >
      <h1 className="mb-8 text-4xl font-bold text-text-DEFAULT text-center flex items-center justify-center">
        <FiActivity className="mr-4"/> Webhook Logs
      </h1>
      {error && (
        <div className="mb-4 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-sm text-red-200 flex items-center">
          <FiAlertTriangle className="mr-2"/> {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-secondary-dark/50 bg-neutral-light/10 shadow-xl backdrop-blur-lg">
        <table className="min-w-full text-left text-xs text-text-DEFAULT">
          <thead className="bg-neutral-dark/80 text-sm uppercase tracking-wider text-text-light">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Processed</th>
              <th className="px-4 py-3">Error</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Raw Body</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t border-secondary-dark/50 hover:bg-neutral-dark/20">
                <td className="px-4 py-3 text-sm font-mono">{log.eventType || "-"}</td>
                <td className="px-4 py-3">
                  {log.processed ? (
                    <span className="text-emerald-400 inline-flex items-center"><FiCheck className="mr-1"/> Yes</span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center"><FiX className="mr-1"/> No</span>
                  )}
                </td>
                <td className="max-w-xs px-4 py-3 text-red-300 font-mono text-xs">{log.error || "-"}</td>
                <td className="px-4 py-3 text-text-light inline-flex items-center mt-2"><FiClock className="mr-1.5"/>{log.createdAt ? new Date(log.createdAt).toLocaleString() : "-"}</td>
                <td className="max-w-md px-4 py-3 text-text-light">
                  <pre className="whitespace-pre-wrap break-words bg-neutral-dark/50 p-2 rounded-md font-mono text-[10px]">
                    {log.rawBody || "-"}
                  </pre>
                </td>
              </tr>
            ))}
            {!logs.length && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-sm text-text-light">
                  No webhook logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminWebhookLogs;
