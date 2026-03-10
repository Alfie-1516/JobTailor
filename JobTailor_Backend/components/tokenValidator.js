import { supabase } from "../supabaseClient.js";

export const tokenValidator = async (req) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const access_token = authHeader.split(" ")[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(access_token);

  if (error) {
    console.error("Token validation error:", error.message);
    return null;
  }

  if (!user) {
    console.error("No user found for token");
    return null;
  }

  return user;
};
