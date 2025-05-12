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

  //const del = `DROP TABLE IF EXISTS tickets;`;

  const posts = `
  CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    type INT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    status INT NOT NULL,
    urgency INT NOT NULL,
    imgs BYTEA[4]
  );
`;

  const agents = `
    CREATE TABLE IF NOT EXISTS agents (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL
    );
  `;

  const forum = `
    CREATE TABLE IF NOT EXISTS forum (
      id SERIAL PRIMARY KEY,
      pid INT NOT NULL,
      name TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `;


  await pool.query(posts);
  await pool.query(agents);
  await pool.query(forum);

  console.log("[ ✅ ] Table 'tickets' is ready.");
  console.log("[ ✅ ] Table 'agents' is ready.");
  console.log("[ ✅ ] Table 'forum' is ready.");
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
export async function addOneDbTicket(type, name, email, category, description, images) {

  let uType = 0;
  const status = 1;
  let urgency = 0;
  const date = new Date;

  // status codes
  const high = 1;
  const medium = 2;
  const low = 3;

  // status codes for user-type
  const user = 1;
  const lead = 2;

  // img format
  const imagesJSON = [
    images.img1 ? Buffer.from(images.img1, 'hex') : null,
    images.img2 ? Buffer.from(images.img2, 'hex') : null,
    images.img3 ? Buffer.from(images.img3, 'hex') : null,
    images.img4 ? Buffer.from(images.img4, 'hex') : null,
  ];

  if (category === 'Security concern' || category === 'Crash or freezing issue' || category === 'Installation issue')
  {
    urgency = high;
  }
  else if (category === 'Update or version issue' || category === 'Integration issue with third-party software' || category === 'Bug report')
  {
    urgency = medium;
  }
  else
  {
    urgency = low;
  }

  if (type === user)
    uType = user;
  else
    uType = lead;

  try {
    const res = await pool.query(
      'INSERT INTO tickets (type, name, email, category, description, date, status, urgency, imgs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [uType, name, email, category, description, date, status, urgency, imagesJSON]
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

export async function isDbAgent(email) {
  try {
    const res = await pool.query(
      'SELECT FROM agents WHERE email = $1',
      [email]
    );

    console.log('[ 🔎 ] Recived look for agent req');

    if (res.rowCount === 0) {
      return {
        success: true,
        agent: false,
      };
    }
    else {
      return {
        success: true,
        agent: true,
      };
    }

  } catch (err) {
    console.error('[ ⚡ ] Error finding agent:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export async function addDbAgent(email) {
  try {
    const res = await pool.query(
      'INSERT INTO agents (email) VALUES ($1) RETURNING *',
      [email]
    );

    console.log('[ 🗽 ] Recived add new agent req');

    if (res.rowCount > 0) {
      return {
        success: true,
        agent: email,
      };
    }
    else {
      return {
        success: true,
        agent: 0,
      };
    }

  } catch (err) {
    console.error('[ ⚡ ] Error adding agent:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export async function getDbRequests(email) {
  try {
    const res = await pool.query(
      'SELECT * FROM tickets WHERE email = $1',
      [email]
    );

    return {
      success: true,
      userRequest: res.rows, // will be [] if no rows found
    };
  } catch (err) {
    console.error('[ ⚡ ] Error getting requests:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
