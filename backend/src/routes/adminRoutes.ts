import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("ADMIN"));

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        branch: true,
      },
      orderBy: {
        userId: "asc",
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

router.post("/users", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roleId,
      branchId,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        roleId,
        branchId,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
});

router.get("/branches", async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: {
        branchId: "asc",
      },
    });

    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch branches", error });
  }
});

router.get("/roles", async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        roleId: "asc",
      },
    });

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch roles", error });
  }
});

export default router;