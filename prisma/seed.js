import bcrypt from "bcrypt";
import prisma from "../src/config/db.js";

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("password123", 10);
  const user1Password = await bcrypt.hash("password123", 10);
  const user2Password = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: user1Password,
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: user2Password,
      role: "USER",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Admin Post",
        content: "This post belongs to admin.",
        authorId: admin.id,
      },
      {
        title: "User One Post",
        content: "This post belongs to user one.",
        authorId: user1.id,
      },
      {
        title: "User Two Post",
        content: "This post belongs to user two.",
        authorId: user2.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });