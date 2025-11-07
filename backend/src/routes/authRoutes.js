const express = require('express');
const router = express.Router();
const {
  adminLogin,
  studentLogin,
  studentRegister,
  facultyLogin,
  facultyRegister
} = require('../controllers/authController');

router.post('/admin/login', adminLogin);
router.post('/student/login', studentLogin);
router.post('/student/register', studentRegister);
router.post('/faculty/login', facultyLogin);
router.post('/faculty/register', facultyRegister);

module.exports = router;
