const {
  Category,
  Company,
  Investment,
  User,
  UserProfile,
} = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async landing(req, res) {
    try {
      // res.send(`landing page! MONGGO LOGIN ATAU REGISTER`);
      res.render("landing");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async registerUser(req, res) {
    try {
      // res.send(`RegisterPage!`);
      res.render("register");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async addUser(req, res) {
    try {
      res.send(`berhasil registrer!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userLogin(req, res) {
    try {
      // res.send(`Login page!`);
      res.render("login");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async loggedIn(req, res) {
    try {
      res.send(`berhasil Login!`);
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

  //! UDAH
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

  //! UDAH
  static async companyDetail(req, res) {
    try {
      // res.send(`detil persuahaaaan!`);
      const { id } = req.params;
      const company = await Company.findByPk(id, {
        include: [{ model: Category }],
      });
      // res.send(company);
      res.render("companyDetails", { company });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async showInvestmentForm(req, res) {
    try {
      // res.send(`buat nginvestnyaa!`);
      const { id } = req.params;
      const company = await Company.findByPk(id, {
        include: [{ model: Category }],
      });
      const users = await User.findAll();
      console.log(users);

      res.render("addInvestment", { company, users, id });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async createInvestment(req, res) {
    try {
      // res.send(`BERHASIL DIINVEST!`);
      // console.log(req.body);
      const { CompanyId, name, description, UserId, InvestmentType, amount } =
        req.body;

      console.log(req.body);
      const newInvestment = await Investment.create({
        name,
        description,
        InvestmentType,
        amount,
        UserId,
        CompanyId,
      });

      // res.send(newInvestment);
      res.redirect("/companies");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userInvestments(req, res) {
    try {
      res.send(`DAFTAR INVESTMENT PENGGUNA!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async editInvestmentForm(req, res) {
    try {
      res.send(`EDit investment yang udah ada!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async updateInvestment(req, res) {
    try {
      res.send(`UPDATE BERHAISL!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async deleteInvestment(req, res) {
    try {
      res.send(`DELETE AJA investmentnya!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
