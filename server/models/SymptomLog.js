import mongoose from 'mongoose';

const symptomLogSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  temperature: {
    type: Number,
    min: 30,
    max: 45,
    default: null
  },
  symptoms: [{
    type: String,
    required: true,
    enum: [
      'fever',
      'cough', 
      'headache',
      'chest pain',
      'shortness of breath',
      'nausea',
      'fatigue',
      'sore throat'
    ]
  }],
  durationDays: {
    type: Number,
    required: true,
    min: 0,
    max: 365
  },
  notes: {
    type: String,
    maxlength: 500,
    default: ''
  },
  severity_score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  suggested_next_steps: [{
    type: String,
    required: true
  }],
  flags: [{
    type: String,
    enum: ['EMERGENCY', 'ATTENTION', 'REVIEW']
  }],
  explanation: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
symptomLogSchema.index({ patientId: 1, createdAt: -1 });
symptomLogSchema.index({ createdAt: -1 });

const SymptomLog = mongoose.model('SymptomLog', symptomLogSchema);

export default SymptomLog;
