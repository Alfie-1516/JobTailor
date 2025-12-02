import { supabase } from "../supabaseClient.js";

export const getUserById = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        error: "A user_id is required for this endpoint to work",
      });
    }

    const { data: user, error } = await supabase
      .from("tbl_users")
      .select("*")
      .eq("id", parseInt(user_id)) // <- FILTER BY ID
      .maybeSingle(); // <- returns null if no match

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "No user found with the provided id",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
