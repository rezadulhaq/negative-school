const {User, Category, Profile, Course} = require("../models")
const Menit = require('../helpers/menit')
class Controller {
    static showAdmin(req, res) {
        res.render("admin/homePage")
      }

      static showCourseData(req, res) {
        Course.findAll()
        .then(function(data){
          res.render("admin/course", {data, Menit})
        })
        .catch(function(err){
          res.send(err)
        })
        // res.render("course")
      }

      static showCourseByCategory(req,res) {
        const id = +req.params.categoryId
        
        Category.findByPk(id, {
          include: [{
            model: Course
        }]
        })
        .then(function(data){
          console.log(data);
          res.render("admin/courseByCategoryId", {data, id, Menit})
        })
        .catch(function(err){
          res.send(err)
        })
      }
    
      static showCategorieData(req, res) {
        Category.findAll()
        .then(function(data){
          res.render("admin/categorie", {data})
        })
        .catch(function(err){
          res.send(err)
        })
        // res.render("course")
      }

      static formAddCategorie(req, res) {
        res.render("admin/addCategories")
      }
      
      static handleAddCategorie(req, res) {
        const { name } = req.body
        Category.create({ name })
        .then(function (_) {
          res.redirect('/admin/categories/')
        })
                .catch(function (err) {
                    res.send(err)
                  })
                }
                static formAddCourse(req, res) {
                    res.render("admin/addCourse")
                  }
                  
                  static handleAddCourse(req, res) {
                    const CategoryId = +req.params.categoryId
                    const { name, description, duration} = req.body
                    console.log(req.body);
                    Course.create({ name, description, duration, CategoryId})
                    .then(function (_) {
                      console.log(CategoryId);
                      res.redirect(`/admin/categories/${CategoryId}`)
                    })
                    .catch(function (err) {
                      console.log(err);
                      res.send(err)
                    })
                  }
                  
                  static formEditCourse(req, res) {
                    const err = req.query.err
                    const CategoryId = +req.params.categoryId
                    const reqId = +req.params.coursesId
                    console.log({id: req.params})
                    console.log(reqId, CategoryId);
                    Course.findOne({ where: { id: reqId } })
                    .then(function (data) {
                      res.render("admin/editCourse", { data, err })
                    })
                    .catch(function (err) {
                      res.send(err)
          })
        }
        
        static handleEditCourse(req, res) {
          const { name, description, duration} = req.body
          const course = +req.params.coursesId
          const CategoryId = +req.params.categoryId
          console.log(req.params, "<<<<<<<<<<<<<<<<<<<");
          // console.log(req.body);
          Course.update({ name, description, duration, CategoryId},{
            where:{
              id: course
            }
          })
          .then(function (_) {
            res.redirect(`/admin/categories/${CategoryId}`)
          })
          .catch(function (err) {
            // console.log(err);
            res.send(err)
          })
        }
        
        static deleteCourse(req, res) {
          const CourseId = +req.params.coursesId
          const CategoryId = +req.params.categoryId
          console.log("MMMMMMAAAAAAAASDDDDADAD");
          console.log(req.params)
          console.log(CourseId, CategoryId);
          Course.findByPk(CourseId)
          .then(function (data) {
            Course.destroy({
              where: { id: CourseId }
            })
            res.redirect(`/admin/categories/${CategoryId}`)
          })
          // .then(function (data) {
          //   res.redirect(`/admin/categories/${CategoryId}`)
          // })
          .catch(function (err) {
            res.send(err)
          })
        }
        //bagian user
        static showUser(req, res){
          Category.findAll({
            include: Course 
          })
          .then(function(data){
            // res.send(data)
            res.render("users/homePageUsers", {data})
          })
          .catch()
        }

}

module.exports = Controller