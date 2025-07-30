import MeetingBooking from "../models/RoomModel.js";
import { Sequelize } from "sequelize";

export const getMeetingBookings = async (req, res) => {
    try{
        const response = await MeetingBooking.findAll({
            order: [['meetingDate', 'ASC'], ['startTime', 'ASC']]
        });
        res.status(200).json(response);
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

export const getMeetingBookingById = async (req, res) => {
    try{
        const response = await MeetingBooking.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({msg: "Meeting booking not found"});
        }
        res.status(200).json(response);
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

export const createMeetingBooking = async (req, res) => {
    try{
        // Validate required fields
        const { unit, roomNumber, roomCapacity, meetingDate, startTime, endTime, participantCount, consumptionType, consumptionAmount } = req.body;
        
        if (!unit || !roomNumber || !roomCapacity || !meetingDate || !startTime || !endTime || !participantCount || !consumptionType || !consumptionAmount) {
            return res.status(400).json({msg: "All fields are required"});
        }

        // Validate participant count doesn't exceed room capacity
        if (participantCount > roomCapacity) {
            return res.status(400).json({msg: "Number of participants cannot exceed room capacity"});
        }

        // Validate time logic
        if (startTime >= endTime) {
            return res.status(400).json({msg: "End time must be after start time"});
        }

        // Check for booking conflicts
        const existingBooking = await MeetingBooking.findOne({
            where: {
                roomNumber: roomNumber,
                meetingDate: meetingDate,
                startTime: {
                    [Sequelize.Op.lt]: endTime
                },
                endTime: {
                    [Sequelize.Op.gt]: startTime
                }
            }
        });

        if (existingBooking) {
            return res.status(400).json({msg: "Room is already booked for this time period"});
        }

        await MeetingBooking.create(req.body);
        res.status(201).json({msg: "Meeting booking created successfully!"});
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

export const updateMeetingBooking = async (req, res) => {
    try{
        const { unit, roomNumber, roomCapacity, meetingDate, startTime, endTime, participantCount, consumptionType, consumptionAmount } = req.body;
        
        if (!unit || !roomNumber || !roomCapacity || !meetingDate || !startTime || !endTime || !participantCount || !consumptionType || !consumptionAmount) {
            return res.status(400).json({msg: "All fields are required"});
        }

        // Validate participant count doesn't exceed room capacity
        if (participantCount > roomCapacity) {
            return res.status(400).json({msg: "Number of participants cannot exceed room capacity"});
        }

        // Validate time logic
        if (startTime >= endTime) {
            return res.status(400).json({msg: "End time must be after start time"});
        }

        // Check for booking conflicts (excluding current booking)
        const existingBooking = await MeetingBooking.findOne({
            where: {
                id: { [Sequelize.Op.ne]: req.params.id },
                roomNumber: roomNumber,
                meetingDate: meetingDate,
                startTime: {
                    [Sequelize.Op.lt]: endTime
                },
                endTime: {
                    [Sequelize.Op.gt]: startTime
                }
            }
        });

        if (existingBooking) {
            return res.status(400).json({msg: "Room is already booked for this time period"});
        }

        await MeetingBooking.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Meeting booking updated successfully!"});
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

export const deleteMeetingBooking = async (req, res) => {
    try{
        const result = await MeetingBooking.destroy({
            where: {
                id: req.params.id
            }
        });
        
        if (result === 0) {
            return res.status(404).json({msg: "Meeting booking not found"});
        }
        
        res.status(200).json({msg: "Meeting booking deleted successfully!"});
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

// Additional useful endpoints
export const getBookingsByDate = async (req, res) => {
    try{
        const { date } = req.params;
        const response = await MeetingBooking.findAll({
            where: {
                meetingDate: date
            },
            order: [['startTime', 'ASC']]
        });
        res.status(200).json(response);
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
}

export const getBookingsByUnit = async (req, res) => {
    try{
        const { unit } = req.params;
        const response = await MeetingBooking.findAll({
            where: {
                unit: unit
            },
            order: [['meetingDate', 'ASC'], ['startTime', 'ASC']]
        });
        res.status(200).json(response);
    }catch(error){
        console.error('error message', error.message)
        res.status(500).json({msg: error.message})
    }
} 