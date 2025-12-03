import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiShield, FiCheckCircle, FiStar, FiClock } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const expiry = user.subscriptionExpiry
    ? new Date(user.subscriptionExpiry)
    : null;

  const ProfileItem = ({ icon, label, value }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <div className="text-xs text-text-light">{label}</div>
            <div className="text-text-DEFAULT font-medium">{value}</div>
        </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="mx-auto max-w-5xl px-4 py-8"
    >
      <h1 className="mb-8 text-4xl font-bold text-text-DEFAULT text-center flex items-center justify-center">
        <FiUser className="mr-4"/> Your Profile
      </h1>
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        className="max-w-md mx-auto rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-8 text-sm text-[#6e6670] shadow-xl backdrop-blur-lg space-y-6"
      >
        <ProfileItem icon={<FiMail className="text-primary-light " size={20}/>} label="Email" value={user.email} />
        <ProfileItem icon={<FiShield className="text-primary-light" size={20}/>} label="Account Type" value={user.isMaster ? "Master (Admin)" : "Normal User"} />
        <ProfileItem icon={<FiCheckCircle className="text-primary-light" size={20}/>} label="Subscription Status" value={user.subscriptionActive ? "Active" : "Inactive"} />
        <ProfileItem icon={<FiStar className="text-primary-light" size={20}/>} label="Subscription Plan" value={user.subscriptionPlan || "None"} />
        <ProfileItem icon={<FiClock className="text-primary-light" size={20}/>} label="Subscription Expiry" value={expiry ? expiry.toLocaleString() : "N/A"} />
        
        <div className="pt-4 text-xs text-text-light">
          Master accounts bypass device locks and subscription expiry for the Electron app.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
