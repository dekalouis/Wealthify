const {
  Category,
  Company,
  Investment,
  User,
  UserProfile,
} = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const { formatRupiah } = require("../helpers/formatRupiah");
const { formatDate } = require("../helpers/formatDate");

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

  //!!! KERJAINNNNN============
  static async profilePage(req, res) {
    try {
      // if (!req.session.user) {
      //   const error = "Please log in to view your profile!";
      //   return res.redirect(`/login?error=${error}`);
      // }
      // res.send(`profile page!!`);
      console.log(req.session.user);
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
  static async companiesPage(req, res) {
    try {
      //!!CEK SI USER PUNYA INVESTMENT ITU GAAA
      let userInvestments = [];
      if (req.session.user) {
        const userId = req.session.user.id;
        userInvestments = await Investment.findAll({
          where: { UserId: userId },
          attributes: ["id", "CompanyId"],
        });
      }
      const investmentMap = userInvestments.reduce((acc, inv) => {
        acc[inv.CompanyId] = inv.id;
        return acc;
      }, {});
      // console.log(userInvestments, `INI NIHH`, investedCompanyIds);
      //UDAHHH

      const { search, category, error } = req.query;
      let filter = {};
      let categoryFilter = {};

      if (search) {
        filter.name = {
          [Op.iLike]: `%${search}%`,
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
      res.render("companiesPage", {
        companies,
        categories,
        search,
        category,
        //TAMBAHIN YG DIPUNYAA
        investmentMap,
        error: error || null,
      });
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
      // console.log(users);

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
      const { id } = req.params;
      const { name, description, UserId, investmentType, amount } = req.body;

      // console.log(req.body);

      const newInvestment = await Investment.create({
        name,
        description,
        investmentType,
        amount,
        UserId,
        CompanyId: id,
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
      const { id, role } = req.session.user;

      //!!!!!!!KONDISI BUAT ADMIN
      let condition = {};
      if (role !== "admin") {
        condition = { id };
      }
      //! UDAH

      const investments = await User.findAll({
        where: condition,
        include: {
          model: Company,
          through: {
            attributes: [
              "id",
              "name",
              "description",
              "investmentType",
              "amount",
            ], // Specify fields to include from the junction table https://sequelize.org/docs/v6/core-concepts/assocs/#foobelongstomanybar--through-baz-
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
      res.render("investments", { investments, formatRupiah, formatDate });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async editInvestmentForm(req, res) {
    const { investmentId } = req.params;
    const { id: loggedInUserId, role } = req.session.user;

    try {
      const companies = await Company.findAll();
      const investment = await Investment.findOne({
        where: { id: investmentId },
        attributes: [
          "id",
          "name",
          "description",
          "investmentType",
          "amount",
          "CompanyId",
          "UserId",
        ],
      });

      console.log(investment.UserId, `bandingin sama `, loggedInUserId);
      console.log(investment);
      //CHECK ROLEE SAMA USER
      if (role !== "admin" && investment.UserId !== loggedInUserId) {
        let error = `no access!`;
        return res.redirect(`/companies?error=${error}`);
      }
      //

      res.render("editInvestment", { investment, companies });
      // res.send(companies);
      // res.send(`EDit investment yang udah ada!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async updateInvestment(req, res) {
    const { investmentId } = req.params;
    const { id: loggedInUserId, role } = req.session.user;

    const { name, description, investmentType, amount, CompanyId } = req.body;
    try {
      const investment = await Investment.update(
        { name, description, investmentType, amount, CompanyId },
        { where: { id: investmentId } }
      );

      // CHECK ROLEE SAMA USER
      if (role !== "admin" && investment.UserId !== loggedInUserId) {
        let error = `no access!`;
        return res.redirect(`/companies?error=${error}`);
      }
      //

      // res.send(`UPDATE BERHASIL!`);
      res.redirect("/investments");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async deleteInvestment(req, res) {
    const { investmentId } = req.params;
    const { id: loggedInUserId, role } = req.session.user;

    try {
      const investment = await Investment.findOne({
        where: { id: investmentId },
      });

      // CHECK ROLEE SAMA USER
      if (role !== "admin" && investment.UserId !== loggedInUserId) {
        let error = `no access!`;
        return res.redirect(`/companies?error=${error}`);
      }
      //
      await Investment.destroy({ where: { id: investmentId } });

      res.redirect("/investments");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
