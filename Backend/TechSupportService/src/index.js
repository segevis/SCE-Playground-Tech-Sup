import express, { json } from 'express';
import cors from 'cors';
import { getTechSuppot } from './controllers/techSupController.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 13250;

app.use(cors());
app.use(json());

app.get('/techsupport', getTechSuppot)

app.listen(port, ()=> {
    console.log("Tech-Support Service is running at port: " + port);
})