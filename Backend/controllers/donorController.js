import Donor from '../models/Donor.js';

// Create Donor
export const createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json({
      success: true,
      data: donor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get All Donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get Single Donor
export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    
    if (!donor) {
      return res.status(404).json({
        success: false,
        error: 'Donor not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update Donor
export const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!donor) {
      return res.status(404).json({
        success: false,
        error: 'Donor not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete Donor
export const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    
    if (!donor) {
      return res.status(404).json({
        success: false,
        error: 'Donor not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};