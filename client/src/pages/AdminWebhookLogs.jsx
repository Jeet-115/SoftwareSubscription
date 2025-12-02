import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const AdminWebhookLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { adminKey } = useAuth();

  useEffect(() => {
    const load = async () => {
      setError("");

      // Require admin key (only master users receive this on login)
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
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Loading webhook logs...
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-slate-100">
        Webhook Logs
      </h1>
      {error && (
        <div className="mb-4 rounded-md border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60">
        <table className="min-w-full text-left text-xs text-slate-200">
          <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Event</th>
              <th className="px-3 py-2">Processed</th>
              <th className="px-3 py-2">Error</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Raw Body</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t border-slate-800">
                <td className="px-3 py-2 text-[11px]">
                  {log.eventType || "-"}
                </td>
                <td className="px-3 py-2 text-[11px]">
                  {log.processed ? (
                    <span className="text-emerald-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>
                <td className="max-w-[160px] px-3 py-2 text-[11px] text-red-300">
                  {log.error || "-"}
                </td>
                <td className="px-3 py-2 text-[11px] text-slate-400">
                  {log.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td className="max-w-[240px] px-3 py-2 text-[10px] text-slate-300">
                  <pre className="whitespace-pre-wrap break-words">
                    {log.rawBody || "-"}
                  </pre>
                </td>
              </tr>
            ))}
            {!logs.length && (
              <tr>
                <td
                  colSpan="5"
                  className="px-3 py-4 text-center text-xs text-slate-400"
                >
                  No webhook logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWebhookLogs;


