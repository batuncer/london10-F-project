const { pool } = require("./dbConfig");

const getSignUpDetailsFromDatabase = async (userId) => {
  try {
    // Query to select all sign-up details with id from the table
    const query = "SELECT * FROM public.attendee WHERE id = $1";

    // Execute the query
    const result = await pool.query(query, [userId]);

    // Return the rows from the result
    return result.rows;
  } catch (error) {
    console.error("Error fetching sign-up details from the database:", error);
    throw error;
  }
};

const cancelSignUp = async (classId, userId) => {
  try {
    await pool.query(
      "DELETE FROM public.attendee WHERE person_id = $1 AND session_id = $2",
      [userId, classId]
    );
  } catch (error) {
    console.error("Error canceling sign-up:", error);
    throw error;
  }
};

const insertSignUp = async (sessionId, role, userId) => {
  try {
    await pool.query(
      "INSERT INTO public.attendee(created_at, person_id, session_id, role_id) VALUES ( $1, $2, $3, $4)",
      [new Date(), userId, sessionId, role]
    );
  } catch (error) {
    console.error("Error insetr  sign-up:", error);
    throw error;
  }
};

module.exports = {
  cancelSignUp,
  getSignUpDetailsFromDatabase,
  insertSignUp,
};
