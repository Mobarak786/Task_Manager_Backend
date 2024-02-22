import express from "express";
const router = express.Router();
import { getAnalytics } from "../Controllers/analytics.controller.js";
import { jwtAuth } from "../Middleware/jwtAuthentication.js";

// route for getting analytics data
router.get("/analytics", jwtAuth, getAnalytics);

export default router;
