import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  //   console.log("tasks encontradas", tasks);
  res.json(tasks);
});

router.post("/", async (req, res) => {
  try {
    const task = await prisma.todo.create({
      data: {
        task: req.body.task,
        userId: req.userId,
      },
    });
    res.json(task);
  } catch (error) {
    res.send(error);
  }
});

export default router;
