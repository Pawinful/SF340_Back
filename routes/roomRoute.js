import express from 'express';
import { addRoom, deleteRoom, editRoom, getAllRoom } from '../controller/roomController.js';

const router = express.Router();

router.post('/', addRoom);

router.get('/', getAllRoom);

router.delete('/:id', deleteRoom);

router.put('/:id', editRoom);

export default router;