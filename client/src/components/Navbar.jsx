import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiLogIn, FiUserPlus, FiGrid, FiLogOut, FiCreditCard, FiUser, FiActivity } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-primary-dark text-neutral-light" : "text-text-light hover:bg-primary-dark"
    }`;

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="bg-transparent border-b border-secondary-dark/20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-text-DEFAULT">
              <motion.div whileHover={{ rotate: 360, scale: 1.2 }}>
                <FiActivity className="text-primary-DEFAULT" size={24} />
              </motion.div>
              <span className="text-lg font-semibold">Device Tracker</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  <FiGrid className="inline mr-2" />
                  Dashboard
                </NavLink>
                <NavLink to="/buy" className={linkClass}>
                  <FiCreditCard className="inline mr-2" />
                  Buy
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  <FiUser className="inline mr-2" />
                  Profile
                </NavLink>
                {user.isMaster && (
                  <NavLink to="/admin/webhook-logs" className={linkClass}>
                    <FiActivity className="inline mr-2" />
                    Webhook Logs
                  </NavLink>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="ml-2 rounded-md bg-primary-dark px-3 py-1.5 text-xs font-medium text-neutral-light hover:bg-primary-dark/80"
                >
                  <FiLogOut className="inline mr-2" />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>
                  <FiLogIn className="inline mr-2" />
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  <FiUserPlus className="inline mr-2" />
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
