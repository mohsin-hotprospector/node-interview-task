import {Request, Response} from 'express';
import HolidayController from '../controllers/holiday.controller';
import HolidayService from '../services/holiday.service';
import responseUtil from '../../../src/utils/response.util';
import constantsUtil from '../../../src/utils/constants.util';

jest.mock('../services/holiday.service');

describe('HolidayController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

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
    })) as any;

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

    (HolidayService.prototype.holidays as jest.Mock).mockResolvedValue([
      true,
      holidayData,
    ]);

    await HolidayController.holidays(req as Request, res as Response);

    expect(HolidayService.prototype.holidays).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(constantsUtil.CODE.OK);
    expect(sendMock).toHaveBeenCalledWith(
      responseUtil.get2xxResponse({
        statusCode: constantsUtil.CODE.OK,
        data: holidayData,
        message: constantsUtil.successFoundMessage('Holidays'),
      })
    );
  });

  it('should return an error when service fails', async () => {
    const errorMessage = 'Invalid country';
    (HolidayService.prototype.holidays as jest.Mock).mockResolvedValue([
      false,
      errorMessage,
    ]);

    await HolidayController.holidays(req as Request, res as Response);

    expect(HolidayService.prototype.holidays).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(constantsUtil.CODE.OK);
    expect(sendMock).toHaveBeenCalledWith(
      responseUtil.get4xxResponse(errorMessage)
    );
  });

  it('should handle exceptions', async () => {
    const error = new Error('Something went wrong');
    (HolidayService.prototype.holidays as jest.Mock).mockRejectedValue(error);

    await HolidayController.holidays(req as Request, res as Response);

    expect(HolidayService.prototype.holidays).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(constantsUtil.CODE.BAD_REQUEST);
    expect(sendMock).toHaveBeenCalledWith(
      responseUtil.get4xxResponse(constantsUtil.Messages.EXCEPTION)
    );
  });
});
