import express from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("BM"));

router.get("/dashboard", async (req: AuthRequest, res) => {
  try {
    const branchId = req.user?.branchId;

    const orders = await prisma.order.findMany({
      where: { branchId },
      include: {
        customer: true,
        table: true,
        payment: true,
      },
    });

    const inventory = await prisma.inventory.findMany({
      where: { branchId },
    });

    const staff = await prisma.user.findMany({
      where: { branchId },
      include: {
        role: true,
      },
    });

    res.json({
      branchId,
      totalOrders: orders.length,
      totalSales: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      orders,
      inventory,
      staff,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load branch dashboard", error });
  }
});

router.get("/orders", async (req: AuthRequest, res) => {
  try {
    const branchId = req.user?.branchId;

    const orders = await prisma.order.findMany({
      where: { branchId },
      include: {
        customer: true,
        table: true,
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch branch orders", error });
  }
});

router.get("/inventory", async (req: AuthRequest, res) => {
  try {
    const branchId = req.user?.branchId;

    const inventory = await prisma.inventory.findMany({
      where: { branchId },
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch branch inventory", error });
  }
});
router.get("/staff", async (req: AuthRequest, res) => {
  try {
    const branchId = req.user?.branchId;

    const staff = await prisma.user.findMany({
      where: {
        branchId,
      },
      include: {
        role: true,
      },
      orderBy: {
        userId: "asc",
      },
    });

    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch branch staff",
      error,
    });
  }
});
export default router;