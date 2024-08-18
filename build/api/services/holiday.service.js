"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_util_1 = __importDefault(require("../../utils/constants.util"));
const node_cache_1 = __importDefault(require("node-cache"));
const holiday_config_json_1 = __importDefault(require("../../config/holiday.config.json"));
const cache = new node_cache_1.default({ stdTTL: holiday_config_json_1.default.cacheTTL });
dotenv_1.default.config();
class HolidayService {
    async holidays(req) {
        //checking for both required query params
        if (!req.query?.country || !req.query?.year) {
            return [false, constants_util_1.default.Messages.PARAMETERS_MISSING];
        }
        //checking year is a number
        if (isNaN(Number(req.query?.year))) {
            return [false, constants_util_1.default.Messages.YEAR_PARAM_INVALID];
        }
        const country = req.query.country;
        const year = req.query.year;
        //cache
        const holidayKey = `holidays_${country}_${year}`;
        const holidayData = cache.get(holidayKey);
        if (holidayData) {
            return [true, holidayData];
        }
        const url = `${holiday_config_json_1.default.calendarificBaseUrl}/holidays?api_key=${process.env.calendarificApiKey}&country=${country}&year=${year}`;
        try {
            const response = await axios_1.default.get(url);
            if (response.data.response.holidays) {
                //cache
                cache.set(holidayKey, response.data.response);
                return [true, response.data.response];
            }
            return [false, constants_util_1.default.Messages.INVALID_COUNTRY];
        }
        catch (error) {
            return [false, error.message];
        }
    }
    async countries() {
        const url = `${holiday_config_json_1.default.calendarificBaseUrl}/countries?api_key=${process.env.calendarificApiKey}`;
        try {
            const response = await axios_1.default.get(url);
            return [true, response.data.response];
        }
        catch (error) {
            return [false, error.message];
        }
    }
}
exports.default = HolidayService;
//# sourceMappingURL=holiday.service.js.map