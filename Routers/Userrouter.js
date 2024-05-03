import express from "express";
import {
  signups,
  logins,
  uploadProduct,
  getProduct,
} from "../Controllers/Controlleruser.js";

const router = express.Router();

// Create sign
router.post("/signup", signups);
// login
router.post("/login", logins);
//uploadProduct
router.post("/products/upload", uploadProduct);
// getProduct
router.get("/product", getProduct);
// session
// router.get("/create-checkout-session", checkoutsession);
export default router;
