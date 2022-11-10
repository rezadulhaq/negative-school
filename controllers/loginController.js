const { User, Profile } = require("../models");
const bcrypt = require("bcrypt");

class Controller {
  static login(req, res) {
    res.render("login");
  }

  static submitLogin(req, res) {

    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        const isValid = bcrypt.compareSync(password, user.password);
        if (user && isValid) {
          const { id, role } = user;
          req.session.user = { id, role };
          if (user.role === "admin") {
            res.redirect("/admin"); //redirect admin page
          } else {
            res.redirect(`/user/${id}`); // redirect user page
          }
        } else {
          res.send(err); // email & password salah
        }
      })
      .catch((err) => res.send(err));
  }

  static register(req, res) {
    const {error} = req.query
    res.render("registerForm", {error});
  }
  static submitRegister(req, res) {
    const { name, picture, age, email, password, gender } = req.body;
    let id;

    User.create({ email, password, role: "user" })
      .then((user) => {
        id = user.id;
        Profile.create({ name, picture, UserId: id, age, gender });
      })
    // User.create({ email, password, role: "user" })
    //   .then((user) => {
    //     id = user.id;
    //     Profile.create({ name, picture, UserId: id, age, gender });
    //   })
      .then((newUser) => {
        res.redirect("/login");
        // res.send(newUser);
      })
      .catch((err) => {
        let error = err.errors.map((el) => {
          return el.message;
        });
        if (error) {
          res.redirect(`/register?error=${error}`);
        } else {
          res.send(err);
        }
      });
  }

  static logOut(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else {
        res.redirect("/login");
      }
    });
  }
}

module.exports = Controller;
