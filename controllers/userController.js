const {User, Profile, Category, Course} = require("../models")

class Controller {
    static showUser(req, res){
      
        
      Category.findAll({
          include: Course 
        })
        .then(function(data){
          // res.send(data)
          res.render(`user/homePage`, {data})
        })
        .catch()
      }

      static formAddCourse(req,res){
        const id = +req.params.userId
        const UserId = +req.params.UserId
        Course.update({UserId},
          {where: {
            UserId : id
          }}
          )
        .then(function(data){
          res.render('user/homePage', {id})
          // res.render('user/addCourse',{data})
        })
        .catch(function(err){
          res.send(err)
        })
      }

      static addCourse(req, res){
        const CourseId = req.body
        const { UserId } = req.params
        Course.update({ UserId },{
          include: [{
            model: User
        }]
        })
        .then(function (_) {
          res.redirect('/admin/categories/')
        })
                .catch(function (err) {
                    res.send(err)
                  })
      }
}

module.exports = Controller