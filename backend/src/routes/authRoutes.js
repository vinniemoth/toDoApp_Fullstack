import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../prismaClient.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos." });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const defaultTodo = "Adicione sua primeira tarefa!";
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      console.log(passwordIsValid);
      res.status(404).json({ message: "Senha Incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(503);
  }
});

export default router;
