const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch
} = require('../controllers/batchController');

router.use(protect(['admin', 'superadmin']));

router.get('/', getAllBatches);
router.post('/', createBatch);
router.put('/:id', updateBatch);
router.delete('/:id', deleteBatch);

module.exports = router;
