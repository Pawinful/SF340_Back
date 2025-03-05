import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import roomRoutes from './routes/roomRoute.js';
import adminRoutes from './routes/adminRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is started at http://localhost:${PORT}`);
});