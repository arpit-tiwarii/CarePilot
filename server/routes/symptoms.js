import express from 'express';
import { submitSymptoms, getLogs, getLogsWithFilters } from '../controllers/symptomController.js';
import { validateSymptomSubmission } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/symptoms
// @desc    Submit symptoms and get evaluation
// @access  Public (for demo purposes)
router.post('/symptoms', validateSymptomSubmission, submitSymptoms);

// @route   GET /api/logs
// @desc    Get symptom logs (optionally filtered by patient)
// @access  Public (for demo purposes)
router.get('/logs', getLogs);

// @route   GET /api/logs/filtered
// @desc    Get logs with advanced filtering and sorting
// @access  Public (for demo purposes)
router.get('/logs/filtered', getLogsWithFilters);

export default router;
