import express from "express";
import prisma from "../lib/prisma";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("CASHIER"));

router.get("/payments", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: {
            customer: true,
            table: true,
          },
        },
      },
      orderBy: {
        paymentDate: "desc",
      },
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments", error });
  }
});

router.post("/payments", async (req, res) => {
  try {
    const { orderId, paymentMethod, amount, paymentStatus } = req.body;

    const payment = await prisma.payment.create({
      data: {
        orderId,
        paymentMethod,
        amount,
        paymentStatus,
      },
    });

    res.status(201).json({
      message: "Payment processed successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to process payment", error });
  }
});

router.get("/receipts/:id", async (req, res) => {
  try {
    const paymentId = Number(req.params.id);

    const receipt = await prisma.payment.findUnique({
      where: { paymentId },
      include: {
        order: {
          include: {
            customer: true,
            table: true,
            orderItems: {
              include: {
                menuItem: true,
              },
            },
          },
        },
      },
    });

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch receipt", error });
  }
});

export default router;