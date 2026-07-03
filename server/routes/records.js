const express = require("express");
const router = express.Router();

const {
  getTodayRecord,
  toggleHabit,getHistory
} = require("../controllers/recordsController");

router.get("/today", getTodayRecord);
router.get("/history", getHistory);

router.put("/:recordId/habits/:habitId", toggleHabit);

module.exports = router;