const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.post('/', protect(['admin', 'superadmin']), createCourse);
router.put('/:id', protect(['admin', 'superadmin']), updateCourse);
router.delete('/:id', protect(['admin', 'superadmin']), deleteCourse);

module.exports = router;
