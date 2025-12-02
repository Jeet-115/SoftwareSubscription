import express from "express";
import {
  softwareLogin,
  resetDevice,
  makeMaster,
} from "../controllers/deviceController.js";
import { adminKeyCheck } from "../middleware/adminKey.js";

const router = express.Router();

// Software login (Electron app)
router.post("/login", softwareLogin);

// Admin APIs (protected by ADMIN_KEY header)
router.post("/admin/reset-device", adminKeyCheck, resetDevice);
router.post("/admin/make-master", adminKeyCheck, makeMaster);

export default router;


