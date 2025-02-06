const { User } = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  static async registerForm(req, res) {
    try {
      // res.send(`RegisterPage!`);
      res.render("auth-pages/register");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async postRegister(req, res) {
    try {
      //   res.send(`berhasil registrer!`);
      const { email, password, role } = req.body;
      console.log(req.body);

      const newUser = await User.create({
        email,
        password,
        role,
      });

      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async loginForm(req, res) {
    try {
      // res.send(`Login page!`);
      const { error } = req.query;
      res.render("auth-pages/login", { error });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async postLogin(req, res) {
    try {
      //   res.send(`berhasil Login!`);

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        const isValidPass = bcrypt.compareSync(password, user.password);

        if (isValidPass) {
          return res.redirect("/companies");
        } else {
          const error = `Invalid Username/Password`;
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = `Invalid Username/Password`;
        return res.redirect(`/login?error=${error}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = UserController;
