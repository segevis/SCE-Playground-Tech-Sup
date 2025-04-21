import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

// Your external PostgreSQL URL
const connectionString = process.env.DB_CON_STR;

// Create a pool of connections
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Initialize DB: create table if it doesn't exist
async function initDB() {
  const query = `
    CREATE TABLE IF NOT EXISTS tickets (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `;
  await pool.query(query);
  console.log("[ ✅ ] Table 'tickets' is ready.");
}

// Call it immediately
initDB().catch(console.error);

// Fetch all tech reports
export async function getAllTechReports() {
  const res = await pool.query('SELECT * FROM tickets');
  console.log('[ 📨 ] Recived GET Req'); // for dbg, delete later!
  return res.rows;
}

// add one ticket.
export async function addOneDbTicket(name, content) {
  try {
    if (!name || !content) {
      throw new Error('Name and content are required.');
    }

    const res = await pool.query(
      'INSERT INTO tickets (name, content) VALUES ($1, $2) RETURNING *',
      [name, content]
    );

    console.log('[ 🎫 ] New ticket added:', res.rows[0]);
    return {
      success: true,
      ticket: res.rows[0],
    };
  } catch (err) {
    console.error('[ ⚡ ] Error adding ticket:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

// edit one ticket.
export async function editOneDbTicket(id, content) {
  try {
    const res = await pool.query(
      'UPDATE tickets SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );

    if (res.rowCount === 0) {
      throw new Error(`Ticket with id ${id} does not exist.`);
    }

    console.log('[ 🩹 ] Patching ticket:', res.rows[0]);
    return {
      success: true,
      message: `Ticket ${id} content was updated.`,
      updatedTicket: res.rows[0],
    };
  } catch (err) {
    console.error('[ ⚠ ] Error patching ticket:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

// delete one ticket.
export async function deleteOneDbTicket(id) {
  try {
    const res = await pool.query(
      'DELETE FROM tickets WHERE id = $1 RETURNING *',
      [id]
    );

    if (res.rowCount === 0) {
      throw new Error(`Ticket with id ${id} does not exist.`);
    }

    console.log('[ 🗑️  ] Recived DEL req');
    return {
      success: true,
      message: `Ticket with id ${id} was deleted.`,
      deletedTicket: res.rows[0],
    };
  } catch (err) {
    console.error('[ ⚡ ] Error deleting ticket:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
