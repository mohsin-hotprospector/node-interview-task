import axios from 'axios';
import dotenv from 'dotenv';
import constantsUtil from '../../utils/constants.util';
import {Request} from 'express';
import NodeCache from 'node-cache';
import configHoliday from '../../config/holiday.config.json';
const cache = new NodeCache({stdTTL: configHoliday.cacheTTL});

dotenv.config();
class HolidayService {
  async holidays(req: Request) {
    //checking for both required query params
    if (!req.query?.country || !req.query?.year) {
      return [false, constantsUtil.Messages.PARAMETERS_MISSING];
    }
    //checking year is a number
    if (isNaN(Number(req.query?.year))) {
      return [false, constantsUtil.Messages.YEAR_PARAM_INVALID];
    }
    const country = req.query.country;
    const year = req.query.year;
    //cache
    const holidayKey = `holidays_${country}_${year}`;
    const holidayData = cache.get(holidayKey);
    if (holidayData) {
      return [true, holidayData];
    }

    const url = `${configHoliday.calendarificBaseUrl}/holidays?api_key=${process.env.calendarificApiKey}&country=${country}&year=${year}`;
    try {
      const response = await axios.get(url);
      if (response.data.response.holidays) {
        //cache
        cache.set(holidayKey, response.data.response);
        return [true, response.data.response];
      }
      return [false, constantsUtil.Messages.INVALID_COUNTRY];
    } catch (error) {
      return [false, error.message];
    }
  }

  async countries() {
    const url = `${configHoliday.calendarificBaseUrl}/countries?api_key=${process.env.calendarificApiKey}`;
    try {
      const response = await axios.get(url);
      return [true, response.data.response];
    } catch (error) {
      return [false, error.message];
    }
  }
}

export default HolidayService;
