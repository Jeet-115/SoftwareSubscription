import { useEffect, useState } from "react";
import api from "../utils/axios";
import { motion } from "framer-motion";
import {
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiGrid,
  FiInfo,
} from "react-icons/fi";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [latestExe, setLatestExe] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(true);
  const [releaseError, setReleaseError] = useState("");

  useEffect(() => {
    const loadLatestRelease = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/Jeet-115/ImportEase/releases/latest"
        );
        const data = await res.json();

        if (!data.assets) {
          setReleaseError("No release assets found.");
          return;
        }

        // Find the .exe file
        const exeAsset = data.assets.find((a) => a.name.endsWith(".exe"));

        if (exeAsset) {
          setLatestExe({
            name: exeAsset.name,
            url: exeAsset.browser_download_url,
            version: data.tag_name,
          });
        } else {
          setReleaseError("No .exe file found in the latest release.");
        }
      } catch (err) {
        console.error(err);
        setReleaseError("Failed to load latest release.");
      } finally {
        setReleaseLoading(false);
      }
    };

    loadLatestRelease();
  }, []);
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
      <div className="flex min-h-screen items-center justify-center text-text-DEFAULT">
        <FiGrid className="animate-spin text-4xl text-primary-DEFAULT" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  const active = data?.subscriptionActive;
  const expiry = data?.subscriptionExpiry
    ? new Date(data.subscriptionExpiry)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-4 py-8"
    >
      <h1 className="mb-8 text-4xl text-[#6e6670] font-bold text-text-DEFAULT text-center">
        Welcome back, {data?.email}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg"
        >
          <h2 className="mb-4 text-xl text-[#6e6670] font-semibold text-text-DEFAULT flex items-center">
            <FiCheckCircle className="mr-3 text-primary-DEFAULT" />
            Subscription Status
          </h2>
          <div className="space-y-3 text-sm text-text-light">
            <p>
              Plan:{" "}
              <span className="font-medium text-text-DEFAULT">
                {data?.subscriptionPlan || "None"}
              </span>
            </p>
            <p className="flex items-center">
              Status:{" "}
              <span
                className={`ml-2 font-semibold ${
                  active ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {active ? (
                  <FiCheckCircle className="inline mr-1" />
                ) : (
                  <FiXCircle className="inline mr-1" />
                )}
                {active ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="flex items-center">
              <FiClock className="mr-2" />
              Expiry:{" "}
              <span className="font-medium text-text-DEFAULT ml-1">
                {expiry ? expiry.toLocaleString() : "N/A"}
              </span>
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg"
        >
          <h2 className="mb-4 text-[#6e6670] text-xl font-semibold text-text-DEFAULT flex items-center">
            <FiInfo className="mr-3 text-primary-DEFAULT" />
            Next Steps
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-text-light">
            <li>Use the Buy button to start or renew a subscription.</li>
            <li>Open your Electron app once the subscription is active.</li>
            <li className="flex items-center">
              Your account is a{" "}
              <span className="font-semibold text-text-DEFAULT ml-1 flex items-center">
                <FiUser className="mr-1" />{" "}
                {data?.isMaster ? "Master" : "Normal User"}
              </span>
              .
            </li>
          </ul>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg"
        >
          <h2 className="mb-4 text-xl text-[#6e6670] font-semibold text-text-DEFAULT flex items-center">
            <FiInfo className="mr-3 text-primary-DEFAULT" />
            Download Software
          </h2>

          {releaseLoading ? (
            <p className="text-sm text-text-light">Checking for updates...</p>
          ) : releaseError ? (
            <p className="text-sm text-red-400">{releaseError}</p>
          ) : (
            <div className="space-y-3 text-sm text-text-light">
              <p>
                Latest Version:{" "}
                <span className="text-text-DEFAULT font-medium">
                  {latestExe?.version}
                </span>
              </p>
              <p>
                File:{" "}
                <span className="text-text-DEFAULT font-medium">
                  {latestExe?.name}
                </span>
              </p>
              <a
                href={latestExe?.url}
                className="inline-block rounded-md bg-primary-DEFAULT px-4 py-2 font-semibold text-[#6e6670] hover:bg-primary-dark hover:text-[#FFFFFF] transition-colors"
                download
              >
                Download Latest EXE
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
