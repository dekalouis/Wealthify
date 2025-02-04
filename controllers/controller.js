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
      //   const options = {
      //     include: Category,
      //   };
      const companies = await Company.findAll();
      res.send(companies);
      //   res.render("companiesPage", { companies });
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
      res.send(`DELETE AJA!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
