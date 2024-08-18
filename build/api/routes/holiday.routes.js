"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holiday_controller_1 = __importDefault(require("../controllers/holiday.controller"));
const router = (0, express_1.Router)();
router.get('/holidays', holiday_controller_1.default.holidays);
router.get('/countries', holiday_controller_1.default.countries);
exports.default = router;
//# sourceMappingURL=holiday.routes.js.map