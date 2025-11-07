const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getDashboardStats,
  getPendingStudents,
  approveStudent,
  getPendingFaculty,
  approveFaculty,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
  recordPayment,
  getAllPayments
} = require('../controllers/adminController');

// Protect all admin routes
router.use(protect(['admin', 'superadmin']));

router.get('/dashboard/stats', getDashboardStats);
router.get('/students/pending', getPendingStudents);
router.put('/students/approve/:id', approveStudent);
router.get('/faculty/pending', getPendingFaculty);
router.put('/faculty/approve/:id', approveFaculty);
router.get('/students', getAllStudents);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.get('/faculty', getAllFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);
router.post('/payments', recordPayment);
router.get('/payments', getAllPayments);

module.exports = router;
