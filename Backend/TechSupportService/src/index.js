import express, { json } from 'express';
import cors from 'cors';
import { getTechSuppot, deleteTicket, addTicket, editTicket } from './controllers/techSupController.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 13250;

app.use(cors());
app.use(json());

// add here routes.
app.get('/techsupport', getTechSuppot);
app.post('/techsupportadd', addTicket);
app.patch('/techsupportedit', editTicket);
app.delete('/techsupportdel', deleteTicket);

app.listen(port, ()=> {
    console.log("[ ✅ ] Tech-Support Service is running at port: " + port);
})