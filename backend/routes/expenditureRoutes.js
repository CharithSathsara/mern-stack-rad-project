const express = require("express");
const router = express.Router();
const {
  getExpenditures,
  setExpenditure,
  updateExpenditure,
  deleteExpenditure,
} = require("../controller/expenditureController");
const { protect } = require("../middleware/authMiddleware");

//get a expenditure and set a expenditure // since one path
router.route("/").get(protect, getExpenditures).post(protect, setExpenditure);

//update a expenditure and delete a expenditure // since one path
router.route("/:id").put(protect, updateExpenditure).delete(protect, deleteExpenditure);

module.exports = router;
