import {Router} from 'express';
import holidayController from '../controllers/holiday.controller';

const router = Router();

router.get('/holidays', holidayController.holidays);
router.get('/countries', holidayController.countries);

export default router;
