const { User, UserProfile } = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  //CHECKING THE SESSION DULU
  //   static async notLoggedIn(req, res, next) {
  //     console.log(req.session);
  //     if (!req.session.userId) {
  //       const error = "Please Login!";
  //       res.redirect(`/login?error=${error}`);
  //     } else {
  //       next();
  //     }
  //   }

  static async registerForm(req, res) {
    try {
      const { errors } = req.query;
      res.render("auth-pages/register", { errors: errors || null });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async postRegister(req, res) {
    try {
      const { email, password, role, fullName, phoneNumber, address } =
        req.body;

      const newUser = await User.create({
        email,
        password,
        role,
      });

      await UserProfile.create({
        fullName,
        phoneNumber,
        address,
        UserId: newUser.id,
      });

      res.redirect("/login");
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((e) => e.message);
        return res.redirect(`/register?errors=${errors.join(",")}`);
      } else {
        console.log(err);
        res.send(err);
      }
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

  //! BUAT LOGINNN
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
          //case berhasil login
          req.session.user = { id: user.id, role: user.role };

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

  static async getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
}

module.exports = UserController;
