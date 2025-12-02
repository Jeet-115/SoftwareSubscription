import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const expiry = user.subscriptionExpiry
    ? new Date(user.subscriptionExpiry)
    : null;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-slate-100">Profile</h1>
      <div className="max-w-md rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm">
        <div className="mb-3">
          <div className="text-xs text-slate-400">Email</div>
          <div className="text-slate-100">{user.email}</div>
        </div>
        <div className="mb-3">
          <div className="text-xs text-slate-400">Account Type</div>
          <div className="text-slate-100">
            {user.isMaster ? "Master (Admin)" : "Normal User"}
          </div>
        </div>
        <div className="mb-3">
          <div className="text-xs text-slate-400">Subscription Status</div>
          <div className="text-slate-100">
            {user.subscriptionActive ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="mb-3">
          <div className="text-xs text-slate-400">Subscription Plan</div>
          <div className="text-slate-100">
            {user.subscriptionPlan || "None"}
          </div>
        </div>
        <div className="mb-1">
          <div className="text-xs text-slate-400">Subscription Expiry</div>
          <div className="text-slate-100">
            {expiry ? expiry.toLocaleString() : "N/A"}
          </div>
        </div>
        <div className="mt-4 text-[11px] text-slate-500">
          Master accounts bypass device locks and subscription expiry for the
          Electron app.
        </div>
      </div>
    </div>
  );
};

export default Profile;


