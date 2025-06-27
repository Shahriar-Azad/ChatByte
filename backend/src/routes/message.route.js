import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// Specific routes first
router.get("/users", protectRoute, getUsersForSidebar);

// ✅ FIXED: changed from "/:id" to "/chat/:id"
router.get("/chat/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
