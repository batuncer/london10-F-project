const { pool } = require("./dbConfig");

const getSignUpDetailsFromDatabase = async (userId, sessionId) => {
  try {
    // Query to select all sign-up details with id from the table
    const query =
      "SELECT person.slack_firstname, person.slack_lastname, role.name, session.location, attendance.session_id FROM attendance JOIN person ON attendance.person_id = person.id JOIN role ON attendance.role_id = role.id JOIN session ON attendance.session_id = session.id WHERE person.id = $1";
    // Execute the query
    const result = await pool.query(query, [userId]);
    // Return the rows from the result
    return result;
  } catch (error) {
    console.error("Error fetching sign-up details from the database:", error);
    throw error;
  }
};

const cancelSignUp = async (sessionId, userId) => {
  try {
    //console.log("Canceling sign-up for sessionId:", sessionId, "userId:", userId);
    await pool.query(
      "DELETE FROM attendance WHERE person_id = $1 AND session_id = $2",
      [userId, sessionId]
    );

  } catch (error) {
    console.error("Error canceling sign-up:", error);
    throw error;
  }
};

const insertSignUp = async (sessionId, role, userId) => {
  try {
    await pool.query(
      "INSERT INTO attendance(person_id, session_id, role_id) VALUES ( $1, $2, $3)",
      [userId, sessionId, role]
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
