import mongoose from 'mongoose';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

export const getUserOngoingBooking = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    try {
        const userOngoingBooking = await Booking.find().where("_id").in(user.ongoingBooking).exec();
        return res.status(200).json({ success: true, data: userOngoingBooking })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserBookingHistory = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    try {
        const userBookingHistory = await Booking.find().where("_id").in(user.bookingHistory).exec();
        return res.status(200).json({ success: true, data: userBookingHistory });
    } catch(error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const book = async (req, res) => {
    const body = req.body;
    try {
        const newBooking = new Booking({
            meetingName: body.meetingName,
            meetingDescription: body.meetingDescription,
            customerUsername: body.customerUsername,
            customerDepartment: body.customerDepartment,
            customerEmail: body.customerEmail,
            bookingStartTime: body.bookingStartTime,
            bookingEndTime: body.bookingEndTime,
            requireApprove: body.requireApprove,
        })

        await newBooking.save();

        await User.updateOne({ username: body.customerUsername }, {$push: {ongoingBooking: newBooking._id}});

        return res.status(200).json({ success: true, data: newBooking });
    } catch(error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// remove this when deploy
export const migrate = async (req, res) => {
    const body = req.body;
    try {
        const newBooking = new Booking({
            meetingName: body.meetingName,
            meetingDescription: body.meetingDescription,
            customerUsername: body.customerUsername,
            customerDepartment: body.customerDepartment,
            customerEmail: body.customerEmail,
            bookingStartTime: body.bookingStartTime,
            bookingEndTime: body.bookingEndTime,
            requireApprove: body.requireApprove,
        })

        await newBooking.save();

        await User.updateOne({username: body.customerUsername},{$push: {ongoingBooking: newBooking._id}});
        
        return res.status(200).json({ success: true, data: newBooking });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}