const express = require("express");
// const auth = require("./auth");
// const profile = require("./profile");
// const company = require("./company");
// const investment = require("./investment");
const Controller = require("../controllers/controller");
const UserController = require("../controllers/UserController");
const { isLoggedIn, isAdmin } = require("../middleware");

const router = express.Router();

// //midlewaress
// const isAdmin = function (req, res, next) {
//     if (req.session.user && req.session.user.role === "admin") {
//       next(); // Proceed if admin
//     } else {
//       const error = "You are not an admin!";
//       res.redirect(`/login?error=${error}`);
//     }
//   };
//   const isLoggedIn = function (req, res, next) {
//     console.log(req.session);
//     if (!req.session.user) {
//       const error = "Please Login!";
//       res.redirect(`/login?error=${error}`);
//     } else {
//       next();
//     }
//   };

//! NANTI DIPISAH
//buat display landing
router.get("/", Controller.landing);
//

//*AUTH
// Register page Login page
router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.postLogin);
router.get("/logout", UserController.getLogout);

// MIDDLEWARE SESSION
router.use(isLoggedIn);

//*PROFILE
// buat show user profile (PAKAI 1 dulu)
router.get("/profile/:id", Controller.profilePage);

//?COMPANY ==== UDAH harusnya kurang lebih
// List semua companies

// company details dr idnya
router.get("/companies", Controller.companiesPage);
router.get("/companies/:id", Controller.companyDetail);
// form invest
router.get("/companies/:id/invest", Controller.showInvestmentForm);
router.post("/companies/:id/invest", Controller.createInvestment);

//*Investment
//list semua investment
router.get("/investments", Controller.userInvestments);
router.get("/investments/:investmentId/edit", Controller.editInvestmentForm);
router.post("/investments/:investmentId/edit", Controller.updateInvestment);
router.get("/investments/:investmentId/delete", Controller.deleteInvestment);

// router.get("/admin/investments", isAdmin, Controller.adminDashboard);
// router.get("/admin/users", isAdmin, Controller.adminUsers);
// router.get("/admin/companies", isAdmin, Controller.adminCompanies);

module.exports = router;
