import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const MeetingBooking = db.define('meeting_bookings',{
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Divisi/Unit yang mengadakan rapat'
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nomor ruang meeting'
    },
    roomCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Kapasitas ruang meeting (jumlah orang)'
    },
    meetingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Tanggal rapat'
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Waktu mulai rapat'
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Waktu selesai rapat'
    },
    participantCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Jumlah peserta'
    },
    consumptionType: {
        type: DataTypes.ENUM('snack_siang', 'makan_siang', 'snack_sore'),
        allowNull: false,
        comment: 'Jenis konsumsi: snack siang, makan siang, snack sore'
    },
    consumptionAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Nominal konsumsi'
    }
},{
    freezeTableName: true
});

export default MeetingBooking;

(async ()=>{
    await db.sync()
})() 