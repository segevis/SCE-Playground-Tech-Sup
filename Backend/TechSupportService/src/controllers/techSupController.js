import { getAllTechReports, deleteDbTicket } from "../services/techSupportService.js";

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