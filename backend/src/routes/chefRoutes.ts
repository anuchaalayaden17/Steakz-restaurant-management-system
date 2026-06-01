import express from "express";
import prisma from "../lib/prisma";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roleAuth";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("CHEF"));

router.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        table: true,
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chef orders", error });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const { orderStatus } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { orderId },
      data: { orderStatus },
    });

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
});

router.post("/menu", async (req, res) => {
  try {
    const { itemName, description, price, category, availabilityStatus } =
      req.body;

    const menuItem = await prisma.menuItem.create({
      data: {
        itemName,
        description,
        price,
        category,
        availabilityStatus,
      },
    });

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item", error });
  }
});

router.patch("/menu/:id", async (req, res) => {
  try {
    const menuItemId = Number(req.params.id);

    const updatedMenuItem = await prisma.menuItem.update({
      where: { menuItemId },
      data: req.body,
    });

    res.json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item", error });
  }
});

export default router;