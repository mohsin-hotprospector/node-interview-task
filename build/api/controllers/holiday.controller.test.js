"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const holiday_controller_1 = __importDefault(require("../controllers/holiday.controller"));
const holiday_service_1 = __importDefault(require("../services/holiday.service"));
const response_util_1 = __importDefault(require("../../../src/utils/response.util"));
const constants_util_1 = __importDefault(require("../../../src/utils/constants.util"));
jest.mock('../services/holiday.service');
describe('HolidayController', () => {
    let req;
    let res;
    let statusMock;
    let sendMock;
    beforeEach(() => {
        req = {
            query: {
                country: 'US',
                year: '2019',
            },
        };
        sendMock = jest.fn();
        statusMock = jest.fn(() => ({
            send: sendMock,
        }));
        res = {
            status: statusMock,
        };
    });
    it('should return holidays data when service succeeds', async () => {
        const holidayData = {
            holidays: [
                {
                    name: "New Year's Day",
                    date: {
                        iso: '2019-01-01',
                        datetime: {
                            year: 2019,
                            month: 1,
                            day: 1,
                        },
                    },
                },
                {
                    name: 'Christmas',
                    date: {
                        iso: '2019-01-01',
                        datetime: {
                            year: 2019,
                            month: 1,
                            day: 1,
                        },
                    },
                },
            ],
        };
        holiday_service_1.default.prototype.holidays.mockResolvedValue([
            true,
            holidayData,
        ]);
        await holiday_controller_1.default.holidays(req, res);
        expect(holiday_service_1.default.prototype.holidays).toHaveBeenCalledWith(req);
        expect(statusMock).toHaveBeenCalledWith(constants_util_1.default.CODE.OK);
        expect(sendMock).toHaveBeenCalledWith(response_util_1.default.get2xxResponse({
            statusCode: constants_util_1.default.CODE.OK,
            data: holidayData,
            message: constants_util_1.default.successFoundMessage('Holidays'),
        }));
    });
    it('should return an error when service fails', async () => {
        const errorMessage = 'Invalid country';
        holiday_service_1.default.prototype.holidays.mockResolvedValue([
            false,
            errorMessage,
        ]);
        await holiday_controller_1.default.holidays(req, res);
        expect(holiday_service_1.default.prototype.holidays).toHaveBeenCalledWith(req);
        expect(statusMock).toHaveBeenCalledWith(constants_util_1.default.CODE.OK);
        expect(sendMock).toHaveBeenCalledWith(response_util_1.default.get4xxResponse(errorMessage));
    });
    it('should handle exceptions', async () => {
        const error = new Error('Something went wrong');
        holiday_service_1.default.prototype.holidays.mockRejectedValue(error);
        await holiday_controller_1.default.holidays(req, res);
        expect(holiday_service_1.default.prototype.holidays).toHaveBeenCalledWith(req);
        expect(statusMock).toHaveBeenCalledWith(constants_util_1.default.CODE.BAD_REQUEST);
        expect(sendMock).toHaveBeenCalledWith(response_util_1.default.get4xxResponse(constants_util_1.default.Messages.EXCEPTION));
    });
});
//# sourceMappingURL=holiday.controller.test.js.map