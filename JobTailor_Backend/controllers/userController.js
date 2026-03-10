import { tokenValidator } from "../components/tokenValidator.js";
import getUserDetails from "../api/user_endpoints/getUserDetails.js";
import updateUserDetails from "../api/user_endpoints/updateUserDetails.js";

// Get user details
export const getUserDetailsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await getUserDetails(user));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get user details: " + error.message });
  }
};

//Update user details
export const updateUserDetailsHandler = async (req, res) => {
  try {
    const user = await tokenValidator(req);
    res.status(200).json(await updateUserDetails(req.body, user));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update user details: " + error.message });
  }
};
