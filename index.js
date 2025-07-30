import express from "express";
import RoomRoute from "./routes/RoomRoute.js";

const app = express();

app.use(express.json());

app.use(RoomRoute);

app.listen(5000, ()=> console.log('Server up and running...')); 