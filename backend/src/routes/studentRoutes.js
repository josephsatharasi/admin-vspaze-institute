const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getMyCourses,
  getMyAssignments,
  submitAssignment,
  getMyTests,
  submitTest,
  getPaymentHistory,
  createPayment,
  getAllJobs,
  applyForJob,
  getMyApplications
} = require('../controllers/studentController');

router.use(protect(['student']));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/courses', getMyCourses);
router.get('/assignments', getMyAssignments);
router.post('/assignments/submit', submitAssignment);
router.get('/tests', getMyTests);
router.post('/tests/submit', submitTest);
router.get('/payments', getPaymentHistory);
router.post('/payments', createPayment);
router.get('/jobs', getAllJobs);
router.post('/jobs/apply', applyForJob);
router.get('/jobs/applications', getMyApplications);

module.exports = router;
