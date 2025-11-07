const Batch = require('../models/batch/Batch');

// Get All Batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate('course faculty students');
    res.json({ success: true, batches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Batch (Admin)
exports.createBatch = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json({ success: true, batch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Batch (Admin)
exports.updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!batch) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }
    res.json({ success: true, batch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Batch (Admin)
exports.deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }
    res.json({ success: true, message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
