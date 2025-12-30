import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  address: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  contactNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  donationStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  lastDonationDate: Date,
  isEligible: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Donor', donorSchema);