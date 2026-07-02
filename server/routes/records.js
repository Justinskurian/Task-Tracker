const express = require("express");
const router = express.Router();

const {
  getTodayRecord,
  toggleHabit,
} = require("../controllers/recordsController");

router.get("/today", getTodayRecord);

router.put("/:recordId/habits/:habitId", toggleHabit);

module.exports = router;