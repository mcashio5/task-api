import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserWithPasswordByEmail,
} from "../repositories/userRepo.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function signupUser({ email, password, role }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already used");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    email,
    password: hashedPassword,
    role: role || "USER",
  });
}

export async function loginUser({ email, password }) {
  const user = await findUserWithPasswordByEmail(email);

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { accessToken };
}