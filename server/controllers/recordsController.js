const db = require("../db/db");

/**
 * Returns today's date in YYYY-MM-DD format.
 */
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Finds today's record if it exists.
 */
const findTodayRecord = async (today) => {
  const [rows] = await db.query(
    `
    SELECT id
    FROM daily_records
    WHERE record_date = ?
    `,
    [today]
  );

  return rows.length > 0 ? rows[0].id : null;
};

/**
 * Creates today's record and its habit checks.
 */
const createTodayRecord = async (today) => {
  const [result] = await db.query(
    `
    INSERT INTO daily_records (record_date)
    VALUES (?)
    `,
    [today]
  );

  const recordId = result.insertId;

  await db.query(
    `
    INSERT INTO habit_checks (record_id, habit_id)
    SELECT ?, id
    FROM habits
    WHERE active = TRUE
    `,
    [recordId]
  );

  return recordId;
};

/**
 * Returns today's record ID.
 * Creates today's record if it doesn't exist.
 */
const getOrCreateTodayRecord = async () => {
  const today = getTodayDate();

  let recordId = await findTodayRecord(today);

  if (!recordId) {
    recordId = await createTodayRecord(today);
  }

  return recordId;
};

/**
 * Builds the response sent to React.
 */
const getTodayResponse = async (recordId) => {
  const [habitRows] = await db.query(
    `
    SELECT
        h.id,
        h.name,
        h.description,
        h.points,
        hc.completed,
        dr.record_date,
        dr.total_score

    FROM habit_checks hc

    JOIN habits h
        ON hc.habit_id = h.id

    JOIN daily_records dr
        ON hc.record_id = dr.id

    WHERE hc.record_id = ?

    ORDER BY h.display_order
    `,
    [recordId]
  );

  if (habitRows.length === 0) {
    throw new Error("No habits found for today's record.");
  }

  return {
    recordId,
    date: habitRows[0].record_date,
    score: habitRows[0].total_score,
    habits: habitRows.map((habit) => ({
      id: habit.id,
      name: habit.name,
      description: habit.description,
      points: habit.points,
      completed: Boolean(habit.completed),
    })),
  };
};

/**
 * GET /records/today
 */
const getTodayRecord = async (req, res) => {
  try {
    const recordId = await getOrCreateTodayRecord();

    const response = await getTodayResponse(recordId);

    res.json(response);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

/**
 * PUT /records/:recordId/habits/:habitId
 */
const toggleHabit = async (req, res) => {
  try {
    const { recordId, habitId } = req.params;

    // Toggle the checkbox
    await db.query(
      `
      UPDATE habit_checks
      SET completed = NOT completed
      WHERE record_id = ?
      AND habit_id = ?
      `,
      [recordId, habitId]
    );

    // Recalculate today's score
    const [scoreRows] = await db.query(
      `
      SELECT
        COALESCE(SUM(h.points), 0) AS totalScore

      FROM habit_checks hc

      JOIN habits h
        ON hc.habit_id = h.id

      WHERE hc.record_id = ?
      AND hc.completed = TRUE
      `,
      [recordId]
    );

    // Save the updated score
    await db.query(
      `
      UPDATE daily_records
      SET total_score = ?
      WHERE id = ?
      `,
      [scoreRows[0].totalScore, recordId]
    );

    // Return the updated record
    const response = await getTodayResponse(recordId);

    res.json(response);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

module.exports = {
  getTodayRecord,
  toggleHabit,
};