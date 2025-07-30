import express from "express"
import { 
    createMeetingBooking, 
    deleteMeetingBooking, 
    getMeetingBookingById, 
    getMeetingBookings, 
    updateMeetingBooking,
    getBookingsByDate,
    getBookingsByUnit
} from "../controller/RoomController.js";

const route = express.Router();

// Basic CRUD operations
route.get('/meeting-bookings', getMeetingBookings)
route.get('/meeting-bookings/:id', getMeetingBookingById)
route.post('/meeting-bookings', createMeetingBooking)
route.put('/meeting-bookings/:id', updateMeetingBooking)
route.delete('/meeting-bookings/:id', deleteMeetingBooking)

// Additional useful endpoints
route.get('/meeting-bookings/date/:date', getBookingsByDate)
route.get('/meeting-bookings/unit/:unit', getBookingsByUnit)

export default route;


