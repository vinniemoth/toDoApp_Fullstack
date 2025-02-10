import express, { json } from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, taskRoutes);

app.get("/", (req, res) => {
  res.json("Alcançou endpoint '/'");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
