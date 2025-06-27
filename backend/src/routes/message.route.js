import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// ✅ Keep fixed/static routes before dynamic ones
router.get("/users", protectRoute, getUsersForSidebar);

// ✅ Changed route from "/:id" to "/chat/:id" to avoid conflict
router.get("/chat/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
