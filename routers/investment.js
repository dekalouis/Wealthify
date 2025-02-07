const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.userInvestments);
router.get("/:investmentId/edit", Controller.editInvestmentForm);
router.post("/:investmentId/edit", Controller.updateInvestment);
router.get("/:investmentId/delete", Controller.deleteInvestment);
router.get("/download", Controller.downloadInvestments);

module.exports = router;
