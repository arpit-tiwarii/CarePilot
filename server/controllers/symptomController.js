import SymptomLog from '../models/SymptomLog.js';
import User from '../models/User.js';
import { evaluate } from '../rules/engine.js';
import { validationResult } from 'express-validator';

// @desc    Submit symptoms and get evaluation
// @route   POST /api/symptoms
// @access  Public (for demo purposes)
export const submitSymptoms = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, temperature, symptoms, durationDays, notes } = req.body;

    // Verify patient exists
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Evaluate symptoms using rules engine
    const result = evaluate({
      temperature: temperature || null,
      symptoms: symptoms || [],
      durationDays: durationDays || 0,
    });

    // Create symptom log
    const symptomLog = new SymptomLog({
      patientId,
      temperature: temperature || null,
      symptoms: symptoms || [],
      durationDays: durationDays || 0,
      notes: notes || '',
      ...result,
    });

    await symptomLog.save();

    res.status(201).json({ log: symptomLog });
  } catch (error) {
    console.error('Submit symptoms error:', error);
    res.status(500).json({ error: 'Server error submitting symptoms' });
  }
};

// @desc    Get symptom logs
// @route   GET /api/logs
// @access  Public (for demo purposes)
export const getLogs = async (req, res) => {
  try {
    const { patientId } = req.query;
    
    let query = {};
    if (patientId) {
      query.patientId = patientId;
    }

    const logs = await SymptomLog.find(query)
      .populate('patientId', 'username')
      .sort({ createdAt: -1 });

    res.json({ logs });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Server error fetching logs' });
  }
};

// @desc    Get logs with advanced filtering and sorting
// @route   GET /api/logs/filtered
// @access  Public (for demo purposes)
export const getLogsWithFilters = async (req, res) => {
  try {
    const { 
      patientId, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      severityMin,
      severityMax,
      dateFrom,
      dateTo,
      symptoms,
      flags
    } = req.query;
    
    let query = {};
    
    // Filter by patient
    if (patientId) {
      query.patientId = patientId;
    }
    
    // Filter by severity range
    if (severityMin || severityMax) {
      query.severity_score = {};
      if (severityMin) query.severity_score.$gte = parseInt(severityMin);
      if (severityMax) query.severity_score.$lte = parseInt(severityMax);
    }
    
    // Filter by date range
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }
    
    // Filter by symptoms
    if (symptoms) {
      const symptomArray = symptoms.split(',').map(s => s.trim());
      query.symptoms = { $in: symptomArray };
    }
    
    // Filter by flags
    if (flags) {
      const flagArray = flags.split(',').map(f => f.trim());
      query.flags = { $in: flagArray };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    let logs = await SymptomLog.find(query)
      .populate('patientId', 'username')
      .sort(sortObj);

    // Apply text search if provided
    if (search) {
      const searchLower = search.toLowerCase();
      logs = logs.filter(log => {
        const patientName = log.patientId?.username || 'Unknown Patient';
        return (
          patientName.toLowerCase().includes(searchLower) ||
          log.symptoms.some(symptom => symptom.toLowerCase().includes(searchLower)) ||
          log.notes?.toLowerCase().includes(searchLower) ||
          log.suggested_next_steps.some(step => step.toLowerCase().includes(searchLower)) ||
          log.flags.some(flag => flag.toLowerCase().includes(searchLower))
        );
      });
    }

    res.json({ 
      logs,
      total: logs.length,
      filters: {
        search,
        sortBy,
        sortOrder,
        severityMin,
        severityMax,
        dateFrom,
        dateTo,
        symptoms,
        flags
      }
    });
  } catch (error) {
    console.error('Get filtered logs error:', error);
    res.status(500).json({ error: 'Server error fetching filtered logs' });
  }
};
