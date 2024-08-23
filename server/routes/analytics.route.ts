import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();


analyticsRouter.get("/get-users-analytics", isAutheticated,authorizeRoles("admin"), getUsersAnalytics);

analyticsRouter.get("/get-orders-analytics", isAutheticated,authorizeRoles("admin"), getOrderAnalytics);

analyticsRouter.get("/get-courses-analytics", isAutheticated,authorizeRoles("admin"), getCoursesAnalytics);


export default analyticsRouter;