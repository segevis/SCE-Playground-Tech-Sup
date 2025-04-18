import * as db from "../data-access/db.js"

export async function getAllTechReports() {
    return await db.getAllTechReports();
}

export async function deleteDbTicket(id) {
    return await db.deleteOneDbTicket(id);
}