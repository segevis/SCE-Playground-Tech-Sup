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
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "invalid ID" });
        }

        const result = await deleteDbTicket(id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: result.error });
        }
    } catch (error) {
        console.error('Tech-Support Service Error:', err.message);
  
        const statusCode = err.status || 500;
        const message = err.message || 'An unexpected error occurred in the Tech-Support Service';

        return res.status(statusCode).json({
            error: true,
            message
        });
    }
}