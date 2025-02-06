const {
  Category,
  Company,
  Investment,
  User,
  UserProfile,
} = require("../models");
const { Op } = require("sequelize");
// const user = require("../models/user");
const { formatRupiah } = require("../helpers/formatRupiah");
const { formatDate } = require("../helpers/formatDate");
const bcrypt = require("bcryptjs");

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
      res.render("register");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async addUser(req, res) {
    const { email, password, role, fullName, phoneNumber, address } = req.body;
    try {
      const result = await User.create({ email, password, role });

      await UserProfile.create({
        fullName,
        phoneNumber,
        address,
        UserId: result.id,
      });
      res.redirect("/");
      // res.send(`berhasil registrer!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userLogin(req, res) {
    const { error } = req.query;
    try {
      res.render("login", { error });
      // res.send(`Login page!`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async loggedIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      console.log(user, "<<<< user");

      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);

        if (isValid) {
          req.session.userId = user.id;
          req.session.role = user.role;

          return res.redirect("/companies");
        } else {
          const error = "Invalid Email / Password";
          return res.redirect(`login/?error=${error}`);
        }
      } else {
        const error = "Invalid Email / Password";
        return res.redirect(`login/?error=${error}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async logOut(req, res) {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
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
  static async companiesPage(req, res) {
    const { search, category } = req.query;
    try {
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
    const { id } = req.params;
    try {
      // res.send(`detil persuahaaaan!`);
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
    const { id } = req.params;
    const { errors } = req.query;
    try {
      const company = await Company.findByPk(id, {
        include: [{ model: Category }],
      });
      const users = await User.findAll();

      res.render("addInvestment", { company, users, id, errors });
      // res.send(`buat nginvestnyaa!`);
      // console.log(users);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  //! UDAH
  static async createInvestment(req, res) {
    const { id } = req.params;
    const { name, description, UserId, investmentType, amount } = req.body;
    try {
      const newInvestment = await Investment.create({
        name,
        description,
        investmentType,
        amount,
        UserId,
        CompanyId: id,
      });
      // res.send(`BERHASIL DIINVEST!`);
      // console.log(req.body);
      // res.send(newInvestment);
      res.redirect("/companies");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.redirect(`/companies/${id}/invest?errors=` + errors.join(","));
      } else {
        res.send(error);
        console.log(error.message);
      }
    }
  }

  static async userInvestments(req, res) {
    try {
      const investments = await User.findAll({
        include: {
          model: Company,
          through: {
            attributes: [
              "id",
              "name",
              "description",
              "investmentType",
              "amount",
            ],
          },
        },
      });

      const totalInvestments = {};
      for (const user of investments) {
        const totalAmount = await Investment.getTotalInvestmentByUser(user.id);
        totalInvestments[user.id] = totalAmount;
      }

      res.render("investments", {
        investments,
        totalInvestments,
        formatRupiah,
        formatDate,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async editInvestmentForm(req, res) {
    const { investmentId } = req.params;
    const { errors } = req.query;
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
        ],
      });

      res.render("editInvestment", { investment, companies, errors });
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

      res.redirect("/investments");
      // res.send(`UPDATE BERHASIL!`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.redirect(
          `/investments/${investmentId}/edit?errors=` + errors.join(",")
        );
      } else {
        res.send(error);
        console.log(error.message);
      }
    }
  }

  static async deleteInvestment(req, res) {
    const { investmentId } = req.params;
    try {
      await Investment.destroy({ where: { id: investmentId } });

      res.redirect("/investments");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
