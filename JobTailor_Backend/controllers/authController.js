import { login } from "../api/auth_endpoints/login.js";
import { signup } from "../api/auth_endpoints/signUp.js";
import { logout } from "../api/auth_endpoints/logout.js";

// Login
export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  if (user.error) {
    res.status(401).json({ error: user.error });
  } else {
    res.status(200).json(user);
  }
};

// Signup
export const signupHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await signup(firstName, lastName, email, password);

  if (user.error) {
    res.status(401).json({ error: user.error });
  } else {
    res.status(200).json(user);
  }
};

// Logout
export const logoutHandler = async (req, res) => {
  const { user_id } = req.body;
  const result = await logout(user_id);
  if (result.error) {
    res.status(401).json({ error: result.error });
  } else {
    res.status(200).json(result);
  }
};
