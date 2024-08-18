"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup;
const holiday_routes_1 = __importDefault(require("./holiday.routes"));
function setup(app) {
    app.use('/', holiday_routes_1.default);
}
//# sourceMappingURL=base.routes.js.map