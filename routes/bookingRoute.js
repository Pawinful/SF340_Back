import express from 'express';
import { book, getUserBookingHistory, getUserOngoingBooking, migrate } from '../controller/bookingController.js';

const router = express.Router();

router.get('/getBooking', getUserOngoingBooking);

router.get('/getBookingHistory', getUserBookingHistory);

router.post('/book', book);

router.post('/migrateTest', migrate);

export default router;