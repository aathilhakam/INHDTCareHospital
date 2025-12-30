import express from 'express';
import {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor
} from '../controllers/donorController.js';

const router = express.Router();

router.route('/')
  .post(createDonor)
  .get(getDonors);

router.route('/:id')
  .get(getDonorById)
  .put(updateDonor)
  .delete(deleteDonor);

export default router;