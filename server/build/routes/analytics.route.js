"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const analytics_controller_1 = require("../controllers/analytics.controller");
const analyticsRouter = express_1.default.Router();
analyticsRouter.get("/get-users-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_1.getUsersAnalytics);
analyticsRouter.get("/get-orders-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_1.getOrderAnalytics);
analyticsRouter.get("/get-courses-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_1.getCoursesAnalytics);
exports.default = analyticsRouter;
