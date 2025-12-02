export const adminKeyCheck = (req, res, next) => {
  const configuredKey = process.env.ADMIN_KEY;

  if (!configuredKey) {
    console.warn("ADMIN_KEY is not set – admin endpoints are effectively open");
    return res.status(500).json({ message: "Admin key not configured" });
  }

  const incoming = req.headers["x-admin-key"];

  if (!incoming || incoming !== configuredKey) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};


