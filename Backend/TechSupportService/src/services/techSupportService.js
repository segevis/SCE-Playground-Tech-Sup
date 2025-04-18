import * as db from "../data-access/db.js"

export async function getAllTechReports() {
    return await db.getAllTechReports();
}