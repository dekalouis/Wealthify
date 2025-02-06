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

  //!!! KERJAINNNNN============
  static async profilePage(req, res) {
    try {
      // res.send(`profile page!!`);
      const { id } = req.params;
      const user = await User.findByPk(id, {
        include: { model: UserProfile },
      });

      // res.send(user);
      res.render("profile", { user });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  //! UDAH
  // static async companiesPage(req, res) {
  //   try {
  //     //   res.send(`daftar company!`);

  //     const companies = await Company.findAll({
  //       include: Category,
  //       order: [["name", "ASC"]],
  //     });
  //     //   console.log(companies[0].name, `---`, companies[0].companyLogo);
  //     // res.send(companies);
  //     res.render("companiesPage", { companies });
  //   } catch (err) {
  //     console.log(err);
  //     res.send(err);
  //   }
  // }
  static async companiesPage(req, res) {
    try {
      const { search, category } = req.query;
      let filter = {};
      let categoryFilter = {};

      if (search) {
        filter.name = {
          [Op.iLike]: `%${search}%`, // Case-insensitive search
        };
      }

      if (category) {
        categoryFilter.id = category;
      }

      const companies = await Company.findAll({
        where: filter,
        include: {
          model: Category,
          where: categoryFilter,
        },
        order: [["name", "ASC"]],
      });

      const categories = await Category.findAll();

      // console.log(categories);
      res.render("companiesPage", { companies, categories, search, category });
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
  //! UDAH
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
  //! UDAH
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
      const investments = await User.findAll({
        include: {
          model: Company,
          through: {
            attributes: ["id", "name", "investmentType", "amount"], // Specify fields to include from the junction table https://sequelize.org/docs/v6/core-concepts/assocs/#foobelongstomanybar--through-baz-
          },
        },
      });

      // const investments = await Investment.findAll({
      //   include: {
      //     model: User,
      //     include: {
      //       model: Company
      //     }
      //   }
      // })

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
      const companies = await Company.findAll();
      const investment = await Investment.findOne({
        where: { id: investmentId },
        attributes: ["id", "name", "description","investmentType", "amount", "CompanyId"],
      });

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

      res.redirect("/investment");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
