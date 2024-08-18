import {Application} from 'express';
import holidayRouter from './holiday.routes';

export default function setup(app: Application) {
  app.use('/', holidayRouter);
}
