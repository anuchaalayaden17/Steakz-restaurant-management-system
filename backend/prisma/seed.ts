import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const roles = ["ADMIN", "HM", "BM", "CHEF", "CASHIER", "WAITER"];

  for (const roleName of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { roleName },
    });

    if (!existingRole) {
      await prisma.role.create({
        data: {
          roleName,
          description: `${roleName} role`,
        },
      });
    }
  }

  const branches = [
    "Steakz London Central",
    "Steakz Manchester",
    "Steakz Liverpool",
    "Steakz Birmingham",
    "Steakz Leeds",
    "Steakz Bristol",
    "Steakz Glasgow",
  ];

  for (const branchName of branches) {
    const existingBranch = await prisma.branch.findFirst({
      where: { branchName },
    });

    if (!existingBranch) {
      await prisma.branch.create({
        data: {
          branchName,
          location: branchName.replace("Steakz ", ""),
          phoneNumber: "0000000000",
        },
      });
    }
  }

  const adminRole = await prisma.role.findUnique({
    where: { roleName: "ADMIN" },
  });

  const londonBranch = await prisma.branch.findFirst({
    where: { branchName: "Steakz London Central" },
  });

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@steakz.com" },
  });

  if (!existingAdmin && adminRole && londonBranch) {
    await prisma.user.create({
      data: {
        firstName: "System",
        lastName: "Administrator",
        email: "admin@steakz.com",
        password: hashedPassword,
        phoneNumber: "0000000000",
        roleId: adminRole.roleId,
        branchId: londonBranch.branchId,
      },
    });
  }

  await prisma.menuItem.createMany({
    data: [
      {
        itemName: "Grilled Steak",
        description: "Premium grilled steak served with chips.",
        price: 24.99,
        category: "Main Course",
        availabilityStatus: "Available",
      },
      {
        itemName: "Chicken Burger",
        description: "Grilled chicken burger with salad.",
        price: 12.99,
        category: "Main Course",
        availabilityStatus: "Available",
      },
      {
        itemName: "Chocolate Cake",
        description: "Rich chocolate dessert.",
        price: 6.99,
        category: "Dessert",
        availabilityStatus: "Available",
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });