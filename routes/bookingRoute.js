import express from 'express';
import { approveBooking, book, getBooking, getUserBookingHistory, getUserOngoingBooking, migrate } from '../controller/bookingController.js';

const router = express.Router();

router.get('/getUserBooking', getUserOngoingBooking);

router.get('/getBookingHistory', getUserBookingHistory);

router.get('/getBooking', getBooking);

router.post('/book', book);

router.put('/approveBooking', approveBooking);

router.post('/migrateTest', migrate);

export default router;