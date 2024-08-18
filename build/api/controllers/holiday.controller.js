"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = __importDefault(require("../../utils/response.util"));
const holiday_service_1 = __importDefault(require("../services/holiday.service"));
const constants_util_1 = __importDefault(require("../../utils/constants.util"));
class HolidayController {
    constructor() {
        this.holidays = async (req, res) => {
            try {
                const response = await this.holidayService.holidays(req);
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.OK)
                        .send(response_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(response_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('Holidays'),
                }));
            }
            catch (error) {
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(response_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.countries = async (req, res) => {
            try {
                const response = await this.holidayService.countries();
                if (!response[0]) {
                    return res
                        .status(constants_util_1.default.CODE.OK)
                        .send(response_util_1.default.get4xxResponse(response[1]));
                }
                return res.status(constants_util_1.default.CODE.OK).send(response_util_1.default.get2xxResponse({
                    statusCode: constants_util_1.default.CODE.OK,
                    data: response[1],
                    message: constants_util_1.default.successFoundMessage('Countries'),
                }));
            }
            catch (error) {
                return res
                    .status(constants_util_1.default.CODE.BAD_REQUEST)
                    .send(response_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
            }
        };
        this.holidayService = new holiday_service_1.default();
    }
}
exports.default = new HolidayController();
//# sourceMappingURL=holiday.controller.js.map