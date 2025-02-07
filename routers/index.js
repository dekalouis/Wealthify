const express = require("express");
const company = require("./company");
const investment = require("./investment");
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
router.get("/logout", UserController.getLogout);

// MIDDLEWARE SESSION
router.use(isLoggedIn);

//*PROFILE
// buat show user profile (PAKAI 1 dulu)
router.get("/profile/:id", Controller.profilePage);

//?COMPANY ==== UDAH
router.use("/companies", company);

//*Investment
router.use("/investments", investment);

module.exports = router;
