import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
 
app.post("/ping", async (req, res) => {
  res.status(500).send("Ping from service A")
});

app.listen(PORT, () => {
  console.log(`service A is running on http://localhost:${PORT}`);
});
