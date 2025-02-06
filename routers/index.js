const express = require("express");
// const auth = require("./auth");
// const profile = require("./profile");
// const company = require("./company");
// const investment = require("./investment");
const Controller = require("../controllers/controller");
const UserController = require("../controllers/UserController");
const { isLoggedIn, isAdmin, redirectIfLoggedIn } = require("../middleware");

const router = express.Router();

//! NANTI DIPISAH
//buat display landing
router.get("/", Controller.landing);
//

//*AUTH
// Register page Login page
router.get("/register", redirectIfLoggedIn, UserController.registerForm);
router.post("/register", redirectIfLoggedIn, UserController.postRegister);
router.get("/login", redirectIfLoggedIn, UserController.loginForm);
router.post("/login", redirectIfLoggedIn, UserController.postLogin);
router.get("/logout", redirectIfLoggedIn, UserController.getLogout);

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

router.get("/investments/download", Controller.downloadInvestments);

module.exports = router;
