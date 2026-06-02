import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("ADMIN"));

router.get("/dashboard", async (req, res) => {
  try {
    const totalBranches = await prisma.branch.count();
    const totalUsers = await prisma.user.count();
    const totalRoles = await prisma.role.count();

    res.json({
      totalBranches,
      totalUsers,
      totalRoles,
      systemStatus: "Active",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin dashboard data",
      error,
    });
  }
});

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

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    await prisma.user.delete({
      where: { userId },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
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

router.get("/menu-items", async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: {
        menuItemId: "asc",
      },
    });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu items",
      error,
    });
  }
});

router.post("/menu-items", async (req, res) => {
  try {
    const { itemName, description, price, category, availabilityStatus } =
      req.body;

    const menuItem = await prisma.menuItem.create({
      data: {
        itemName,
        description,
        price: Number(price),
        category,
        availabilityStatus,
      },
    });

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create menu item",
      error,
    });
  }
});

router.delete("/menu-items/:id", async (req, res) => {
  try {
    const menuItemId = Number(req.params.id);

    await prisma.menuItem.delete({
      where: {
        menuItemId,
      },
    });

    res.json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu item",
      error,
    });
  }
});

export default router;