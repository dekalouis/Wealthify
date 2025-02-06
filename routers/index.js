const express = require("express");
// const auth = require("./auth");
// const profile = require("./profile");
// const company = require("./company");
// const investment = require("./investment");
const Controller = require("../controllers/controller");
const UserController = require("../controllers/UserController");

const router = express.Router();

//! NANTI DIPISAH
//buat display landing
router.get("/", Controller.landing);

//*AUTH
// Register page Login page
router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);
router.get("/login", UserController.loginForm);
router.post("/login", UserController.postLogin);

//*PROFILE
// buat show user profile (PAKAI 1 dulu)
router.get("/profile/:id", Controller.profilePage);

//?COMPANY ==== UDAH harusnya kurang lebih
// List semua companies
router.get("/companies", Controller.companiesPage);
// company details dr idnya
router.get("/companies/:id", Controller.companyDetail);
// form invest
router.get("/companies/:id/invest", Controller.showInvestmentForm);
router.post("/companies/:id/invest", Controller.createInvestment);

//*Investment
//list semua investment
router.get("/investments", Controller.userInvestments);
router.get("/investments/:id/edit", Controller.editInvestmentForm);
router.post("/investments/:id/edit", Controller.updateInvestment);
router.get("/investments/:id/delete", Controller.deleteInvestment);

module.exports = router;
