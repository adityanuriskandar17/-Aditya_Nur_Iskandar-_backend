# Meeting Room Booking System API

A comprehensive REST API for managing meeting room bookings with consumption tracking.

## Features

- **Meeting Room Management**: Book, update, and delete meeting room reservations
- **Conflict Prevention**: Automatic detection of double bookings
- **Consumption Tracking**: Track different types of consumption (snack siang, makan siang, snack sore)
- **Department Management**: Organize bookings by units/departments
- **Validation**: Comprehensive input validation and business logic
- **Query Capabilities**: Filter bookings by date and department

## API Endpoints

### Basic CRUD Operations

- `GET /meeting-bookings` - Get all meeting bookings
- `GET /meeting-bookings/:id` - Get specific booking by ID
- `POST /meeting-bookings` - Create new meeting booking
- `PUT /meeting-bookings/:id` - Update existing booking
- `DELETE /meeting-bookings/:id` - Delete booking

### Query Operations

- `GET /meeting-bookings/date/:date` - Get bookings by specific date
- `GET /meeting-bookings/unit/:unit` - Get bookings by department/unit

## Data Model

### Meeting Booking Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `unit` | String | Department/Unit name | Yes |
| `roomNumber` | String | Room number/identifier | Yes |
| `roomCapacity` | Integer | Maximum room capacity | Yes |
| `meetingDate` | Date | Meeting date (YYYY-MM-DD) | Yes |
| `startTime` | Time | Meeting start time (HH:MM:SS) | Yes |
| `endTime` | Time | Meeting end time (HH:MM:SS) | Yes |
| `participantCount` | Integer | Number of participants | Yes |
| `consumptionType` | Enum | Type: snack_siang, makan_siang, snack_sore | Yes |
| `consumptionAmount` | Decimal | Consumption cost in IDR | Yes |

### Consumption Types

- `snack_siang` - Morning snack
- `makan_siang` - Lunch
- `snack_sore` - Afternoon snack

## Validation Rules

1. **Required Fields**: All fields are mandatory
2. **Capacity Check**: Participant count cannot exceed room capacity
3. **Time Logic**: End time must be after start time
4. **Conflict Prevention**: No double booking for same room and time
5. **Consumption Type**: Must be one of the predefined enum values

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adityanuriskandar17/-Aditya_Nur_Iskandar-_backend.git
cd -Aditya_Nur_Iskandar-_backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `config/Database.js`

4. Start the server:
```bash
npm start
```

## Usage Examples

### Create a Meeting Booking

```bash
curl -X POST http://localhost:5000/meeting-bookings \
  -H "Content-Type: application/json" \
  -d '{
    "unit": "IT",
    "roomNumber": "R001",
    "roomCapacity": 10,
    "meetingDate": "2024-01-15",
    "startTime": "09:00:00",
    "endTime": "11:00:00",
    "participantCount": 8,
    "consumptionType": "snack_siang",
    "consumptionAmount": 150000
  }'
```

### Get Bookings by Date

```bash
curl http://localhost:5000/meeting-bookings/date/2024-01-15
```

### Get Bookings by Department

```bash
curl http://localhost:5000/meeting-bookings/unit/IT
```

## Testing

Use the provided `request.rest` file for comprehensive API testing with various scenarios including:

- Basic CRUD operations
- Error scenarios
- Conflict testing
- Edge cases
- Bulk operations

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database (configurable)

## Project Structure

```
backend/
├── config/
│   └── Database.js          # Database configuration
├── controller/
│   └── RoomController.js    # API controllers
├── models/
│   └── RoomModel.js         # Data models
├── routes/
│   └── RoomRoute.js         # API routes
├── index.js                 # Server entry point
├── package.json             # Dependencies
├── request.rest             # API testing examples
└── README.md               # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Aditya Nur Iskandar