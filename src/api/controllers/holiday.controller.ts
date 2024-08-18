import {Request, Response} from 'express';
import responseUtil from '../../utils/response.util';
import HolidayService from '../services/holiday.service';
import constantsUtil from '../../utils/constants.util';

class HolidayController {
  protected holidayService: HolidayService;

  constructor() {
    this.holidayService = new HolidayService();
  }
  holidays = async (req: Request, res: Response) => {
    try {
      const response = await this.holidayService.holidays(req);
      if (!response[0]) {
        return res
          .status(constantsUtil.CODE.OK)
          .send(responseUtil.get4xxResponse(response[1]));
      }
      return res.status(constantsUtil.CODE.OK).send(
        responseUtil.get2xxResponse({
          statusCode: constantsUtil.CODE.OK,
          data: response[1],
          message: constantsUtil.successFoundMessage('Holidays'),
        })
      );
    } catch (error: any) {
      return res
        .status(constantsUtil.CODE.BAD_REQUEST)
        .send(responseUtil.get4xxResponse(constantsUtil.Messages.EXCEPTION));
    }
  };

  countries = async (req: Request, res: Response) => {
    try {
      const response = await this.holidayService.countries();
      if (!response[0]) {
        return res
          .status(constantsUtil.CODE.OK)
          .send(responseUtil.get4xxResponse(response[1]));
      }
      return res.status(constantsUtil.CODE.OK).send(
        responseUtil.get2xxResponse({
          statusCode: constantsUtil.CODE.OK,
          data: response[1],
          message: constantsUtil.successFoundMessage('Countries'),
        })
      );
    } catch (error: any) {
      return res
        .status(constantsUtil.CODE.BAD_REQUEST)
        .send(responseUtil.get4xxResponse(constantsUtil.Messages.EXCEPTION));
    }
  };
}

export default new HolidayController();
