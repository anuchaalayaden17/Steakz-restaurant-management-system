import express from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("WAITER"));

router.get("/tables", async (req: AuthRequest, res) => {
  try {
    const branchId = req.user?.branchId;

    const tables = await prisma.table.findMany({
      where: { branchId },
      orderBy: { tableNumber: "asc" },
    });

    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tables", error });
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
          include: { menuItem: true },
        },
      },
      orderBy: { orderDate: "desc" },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch waiter orders", error });
  }
});

export default router;