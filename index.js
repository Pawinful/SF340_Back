import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import roomRoutes from './routes/roomRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is started at http://localhost:${PORT}`);
});