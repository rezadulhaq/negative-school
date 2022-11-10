const express = require('express')
const Controller = require('../controllers/adminController')
const router = express.Router()

router.get('/', Controller.showCategorieData)

router.get('/add', Controller.formAddCategorie)
router.post('/add', Controller.handleAddCategorie)

router.get('/:categoryId', Controller.showCourseByCategory )

router.get('/:categoryId/courses/add', Controller.formAddCourse )
router.post('/:categoryId/courses/add', Controller.handleAddCourse )

router.get('/:categoryId/:coursesId/edit', Controller.formEditCourse )
router.post('/:categoryId/:coursesId/edit', Controller.handleEditCourse)

router.get('/:categoryId/:coursesId/delete', Controller.deleteCourse)
// router.post('/:categoryId/:coursesId/edit', Controller.editCourseByCategory )

module.exports = router