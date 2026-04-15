import { loginUser, signupUser } from '../services/authService.js';

export async function signupHandler(req, res) {
  const { email, password, role } = req.body;
  const user = await signupUser({ email, password, role });
  res.status(201).json(user);
}

export async function loginHandler(req, res) {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });
  res.status(200).json(result);
}