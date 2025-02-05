const {
  Category,
  Company,
  Investment,
  User,
  UserProfile,
} = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");

class Controller {
  static async landing(req, res) {
    try {
      res.send(`landing page! MONGGO LOGIN ATAU REGISTER`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async registerUser(req, res) {
    try {
      res.send(`RegisterPage!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userLogin(req, res) {
    try {
      res.send(`Login page!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async profilePage(req, res) {
    try {
      res.send(`profile page!!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  //! dikerjain
  static async companiesPage(req, res) {
    try {
      //   res.send(`daftar company!`);

      const companies = await Company.findAll({
        include: Category,
        order: [["name", "ASC"]],
      });
      //   console.log(companies[0].name, `---`, companies[0].companyLogo);
      // res.send(companies);
      res.render("companiesPage", { companies });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async companyDetail(req, res) {
    try {
      res.send(`detil persuahaaaan!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async showInvestmentForm(req, res) {
    try {
      res.send(`buat nginvestnyaa!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async createInvestment(req, res) {
    try {
      res.send(`BERHASIL DIINVEST!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userInvestments(req, res) {
    try {
      const investments = await User.findAll({
        include: {
          model: Company,
          through: {
            attributes: ["id", "name", "investmentType", "amount"], // Specify fields to include from the junction table https://sequelize.org/docs/v6/core-concepts/assocs/#foobelongstomanybar--through-baz-
          },
        },
      });

      // res.send(investments);
      res.render("investments", { investments });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async editInvestmentForm(req, res) {
    const { investmentId } = req.params;
    try {
      const investment = await Investment.findByPk(investmentId);
      const companies = await Company.findAll();

      res.render("investments-Edit", { investment, companies });
      // res.send(companies);
      // res.send(`EDit investment yang udah ada!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async updateInvestment(req, res) {
    const { investmentId } = req.params;
    const { name, description, investmentType, amount, CompanyId } = req.body;
    try {
      await Investment.update(
        { name, description, investmentType, amount, CompanyId },
        { where: { id: investmentId } }
      );

      // res.send(`UPDATE BERHASIL!`);
      res.redirect("/investments");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async deleteInvestment(req, res) {
    const { investmentId } = req.params;
    try {
      await Investment.destroy({ where: { id: investmentId } });

      res.redirect("/investment")
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
