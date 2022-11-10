const isLogin = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "user") {
      res.redirect("/user");
    }else if (req.session.user.role === "admin"){
      res.redirect("/admin");
    }
  } else {
    next();
  }
};

const isUser = (req, res, next) => {
  if (req.session.user.role === 'user') {
    next()
  } else{
    res.redirect("/admin")
  }
}
const isAdmin = (req, res, next) => {
  if (req.session.user.role === 'admin') {
    next()
  } else{
    res.redirect("/user")
  }
}

module.exports = { isLogin, isAdmin, isUser };
