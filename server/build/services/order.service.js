"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = exports.newOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const order_Model_1 = __importDefault(require("../models/order.Model"));
// create new order
exports.newOrder = (0, catchAsyncErrors_1.CatchAsyncError)(async (data, res) => {
    const order = await order_Model_1.default.create(data);
    res.status(201).json({
        succcess: true,
        order,
    });
});
// Get All Orders
const getAllOrdersService = async (res) => {
    const orders = await order_Model_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        orders,
    });
};
exports.getAllOrdersService = getAllOrdersService;
