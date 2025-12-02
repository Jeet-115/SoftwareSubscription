import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-slate-100">
              <span className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold">
                SUB
              </span>
              <span className="text-sm font-semibold">Software Subscription</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/buy" className={linkClass}>
                  Buy
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                {user.isMaster && (
                  <NavLink to="/admin/webhook-logs" className={linkClass}>
                    Webhook Logs
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


