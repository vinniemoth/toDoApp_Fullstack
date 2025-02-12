import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.todo.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await prisma.todo.create({
      data: {
        task,
        userId: req.userId,
      },
    });
    res.json(task);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  try {
    const updatedTask = await prisma.todo.update({
      where: {
        id: parseInt(id),
        userId: req.userId,
      },
      data: {
        completed: !completed,
      },
    });
    console.log(completed);
    res.send({ updatedTask });
  } catch (error) {
    res.send(error);
  }
});

router.post("/:id/subtask", async (req, res) => {
  const { subtask } = req.body;
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!todo || todo.userId !== req.userId) {
      return res.status(404).send({ message: "Tarefa não encontrada" });
    }

    const newSubTask = await prisma.subTodo.create({
      data: {
        subtask,
        todoId: parseInt(id),
      },
    });
    res.status(201).send({ subtask: newSubTask });
  } catch (error) {
    console.log("Erro ao criar sub-tarefa:", error);
    res.status(500).send({ message: "Erro ao criar subtarefa" });
  }
});

router.get("/:id/subtask", async (req, res) => {
  const { id } = req.params;
  try {
    const subtasks = await prisma.subTodo.findMany({
      where: {
        todoId: parseInt(id),
      },
    });

    if (!subtasks) {
      return res.status(404).send({ message: "Subtarefas não encontradas" });
    }
    res.status(200).json(subtasks);
  } catch (error) {
    console.log("Erro ao buscar subtarefas:", error);
    res.status(500).send({ message: "Erro ao buscar subtarefas" });
  }
});
export default router;
