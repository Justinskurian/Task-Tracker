const express = require("express");
const router = express.Router();

const { getHabits } = require("../controllers/habitsController");

router.get("/", getHabits);

const toggleHabit = async (req, res) => {

    const { recordId, habitId } = req.params;

};
router.put("/:recordId/habits/:habitId", toggleHabit);

module.exports = router;
