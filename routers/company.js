const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

//?COMPANY ==== UDAH harusnya kurang lebih
// List semua companies

// company details dr idnya
router.get("/", Controller.companiesPage);
router.get("/:id", Controller.companyDetail);
// form invest
router.get("/:id/invest", Controller.showInvestmentForm);
router.post("/:id/invest", Controller.createInvestment);

module.exports = router;
