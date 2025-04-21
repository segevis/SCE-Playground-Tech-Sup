import * as db from '../data-access/db.js';

export async function getAllTechReports() {
    return await db.getAllTechReports();
}

export async function addDbTicket(name, content) {
    return await db.addOneDbTicket(name, content);
}

export async function editDbTicket(id, content) {
    return await db.editOneDbTicket(id, content);
}

export async function deleteDbTicket(id) {
    return await db.deleteOneDbTicket(id);
}