import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

router.get("/menu", async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: {
        menuItemId: "asc",
      },
    });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error });
  }
});

router.get("/menu/:id", async (req, res) => {
  try {
    const menuItemId = Number(req.params.id);

    const menuItem = await prisma.menuItem.findUnique({
      where: { menuItemId },
    });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu item", error });
  }
});

export default router;