import express from "express";
import cors from "cors";
import roomRoute from "./routes/RoomRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(roomRoute)

app.listen(5000, () => console.log('server is running on port 5000'))