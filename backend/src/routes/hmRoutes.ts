import express from "express";
import prisma from "../lib/prisma";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("HM"));

router.get("/dashboard", async (req, res) => {
  try {
    const totalBranches = await prisma.branch.count();
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();

    const orders = await prisma.order.findMany();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalBranches,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error,
    });
  }
});

router.get("/branches", async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        users: true,
        orders: true,
      },
    });

    res.json(branches);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch branches",
      error,
    });
  }
});

router.get("/reports", async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        orders: true,
      },
    });

    const report = branches.map((branch) => ({
      branchId: branch.branchId,
      branchName: branch.branchName,
      totalOrders: branch.orders.length,
      totalRevenue: branch.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      ),
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate reports",
      error,
    });
  }
});

export default router;