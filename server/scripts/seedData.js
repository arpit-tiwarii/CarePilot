import connectDB from '../config/database.js';
import User from '../models/User.js';
import SymptomLog from '../models/SymptomLog.js';
import { evaluate } from '../rules/engine.js';

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await SymptomLog.deleteMany({});

    console.log('Creating demo users...');

    // Create demo users
    const patient = new User({
      username: 'demo.patient',
      password: 'patient123',
      role: 'patient'
    });

    const doctor = new User({
      username: 'demo.doctor', 
      password: 'doctor123',
      role: 'doctor'
    });

    await patient.save();
    await doctor.save();

    console.log('Demo users created:');
    console.log('- Patient: demo.patient / patient123');
    console.log('- Doctor: demo.doctor / doctor123');

    // Create sample symptom logs for patient
    console.log('Creating sample symptom logs...');
    
    const sampleLogs = [
      {
        temperature: 38.5,
        symptoms: ['fever', 'cough'],
        durationDays: 2,
        notes: 'Sore throat started yesterday, feeling tired'
      },
      {
        temperature: 36.9,
        symptoms: ['headache'],
        durationDays: 1,
        notes: 'Mild headache, probably from stress'
      },
      {
        temperature: 39.2,
        symptoms: ['chest pain', 'shortness of breath'],
        durationDays: 1,
        notes: 'Tightness in chest, difficulty breathing'
      }
    ];

    for (const sample of sampleLogs) {
      const result = evaluate({
        temperature: sample.temperature,
        symptoms: sample.symptoms,
        durationDays: sample.durationDays,
      });

      const log = new SymptomLog({
        patientId: patient._id,
        temperature: sample.temperature,
        symptoms: sample.symptoms,
        durationDays: sample.durationDays,
        notes: sample.notes,
        ...result,
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7)
      });

      await log.save();
    }

    console.log('Sample logs created successfully!');
    console.log('Database seeded with demo data!');
    console.log('\nYou can now login with:');
    console.log('- Patient: demo.patient / patient123');
    console.log('- Doctor: demo.doctor / doctor123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
