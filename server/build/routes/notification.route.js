"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRoute = express_1.default.Router();
notificationRoute.get("/get-all-notifications", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), notification_controller_1.getNotifications);
notificationRoute.put("/update-notification/:id", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), notification_controller_1.updateNotification);
exports.default = notificationRoute;
