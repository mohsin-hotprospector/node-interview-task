"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const base_routes_1 = __importDefault(require("./api/routes/base.routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        (0, base_routes_1.default)(this.app);
    }
    start() {
        const appPort = process.env.PORT || 3000;
        this.app.listen(appPort, () => {
            console.log(`Server running at http://localhost:${appPort}/`);
        });
    }
}
const app = new App();
app.start();
//# sourceMappingURL=app.js.map