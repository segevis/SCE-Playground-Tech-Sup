import { addDbAgent, isDbAgent } from '../data-access/db.js';
import { getAllTechReports, deleteDbTicket, addDbTicket, editDbTicket, isDbAgentexist, addOneDbAgent, getDbRequestFromOneUser } from '../services/techSupportService.js';

// get all tickets.
export async function getTechSuppot(req, res) {
    
    try {

        const techSup = await getAllTechReports();
        return res.status(200).json(techSup);

    } catch (err) {
        console.error('Tech-Support Service Error:', err.message);
  
        const statusCode = err.status || 500;
        const message = err.message || 'An unexpected error occurred in the Tech-Support Service';

        return res.status(statusCode).json({
            error: true,
            message
        });
    }
}

// add single ticket.
export async function addTicket(req, res) {
    const name = req.query.name;
    const content = req.query.content;

    if (!name || !content) {
        return res.status(400).json({ error: 'Name and content must be not null values.' });
    }

    try {
        const result = await addDbTicket(name, content);
        //console.log("Test!" + result.ticket.id);

        if (result.success) {
        return res.status(200).json(result.ticket.id);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error adding ticket:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// edit sigle ticket.
export async function editTicket(req, res) {
    const id = parseInt(req.query.id, 10);
    const content = req.query.content;

    if (!id || !content) {
        return res.status(400).json({ error: 'id and content must be not null values.' });
    }

    try {
        const result = await editDbTicket(id, content);

        if (result.success) {
        return res.status(200).json(result);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error editing ticket:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// delete single ticket.
export async function deleteTicket(req, res) {
    const id = parseInt(req.query.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ticket ID (use ?id=)' });
    }

    try {
        const result = await deleteDbTicket(id);

        if (result.success) {
        return res.status(200).json(result);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// check if the agent exist.
export async function isAgent(req, res) {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'email must be not null value.' });
    }

    try {
        const result = await isDbAgentexist(email);

        if (result.success) {
        return res.status(200).json(result);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error finding agent:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// add agent.
export async function addAgent(req, res) {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'email must be not null value.' });
    }

    try {
        const result = await addOneDbAgent(email);

        if (result.success) {
        return res.status(200).json(result);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error adding agent:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// get all requests from specific user.
export async function getRequestsFromOneUser(req, res) {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'email must be not null value.' });
    }

    try {
        const result = await getDbRequestFromOneUser(email);

        if (result.success) {
        return res.status(200).json(result);
        } else {
        return res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error getting requests:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

