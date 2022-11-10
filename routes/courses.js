const express = require('express')
const Controller = require('../controllers/adminController')
const router = express.Router()

router.get('/', Controller.showCourseData)


router.get('/add', Controller.formAddCourse)
router.post('/add', Controller.handleAddCourse)

// router.get('/:coursesId/edit', Controller.userFormEditCourse)
// router.post('/:coursesId/edit', Controller.userHandleEditCourse)
router.get('/:id/delete', Controller.deleteCourse)

module.exports = router