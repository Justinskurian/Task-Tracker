const db = require("../db/db");

const getHabits = async (req, res) => {
  try {
    const [rows] =await db.query(
      `SELECT *
            FROM habits
            WHERE active=TRUE
            ORDER BY display_order`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error",
    });
  }
};

module.exports = { getHabits };
