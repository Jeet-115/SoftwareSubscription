import express from "express";
import { body } from "express-validator";
import { register, login, logout } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/authMiddleware.js";

const router = express.Router();

const emailValidator = body("email").isEmail().withMessage("Valid email required");
const passwordValidator = body("password")
  .isLength({ min: 4 })
  .withMessage("Password must be at least 4 characters");

router.post("/register", [emailValidator, passwordValidator], (req, res, next) => {
  // express-validator is included for future checks; for now we call controller directly
  return register(req, res, next);
});

router.post(
  "/login",
  loginLimiter,
  [emailValidator, passwordValidator],
  (req, res, next) => {
    return login(req, res, next);
  }
);

router.post("/logout", logout);

export default router;


