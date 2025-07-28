import About_User from "../models/About_User.js";

// Get all about user profiles
export const getAllAboutUsers = async (req, res) => {
  try {
    const aboutUsers = await About_User.find({ isPublic: true })
      .populate("userId", "firstName lastName email")
      .select("-__v");

    res.status(200).json({
      success: true,
      count: aboutUsers.length,
      data: aboutUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about users",
      error: error.message,
    });
  }
};

// Get about user profile by ID
export const getAboutUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Search by userId field, not by _id
    const aboutUser = await About_User.findOne({ userId: id })
      .populate("userId", "firstName lastName email")
      .select("-__v");

    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: aboutUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about user",
      error: error.message,
    });
  }
};

// Create new about user profile
export const createAboutUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;

    // Check if profile already exists for this user
    const existingProfile = await About_User.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    // Only create with required fields
    const aboutUser = new About_User({
      userId,
      firstName,
      lastName,
      email,
    });
    const savedAboutUser = await aboutUser.save();

    res.status(201).json({
      success: true,
      data: savedAboutUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating about user profile",
      error: error.message,
    });
  }
};

// Update about user profile
export const updateAboutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { section, subsectionId, data } = req.body;

    // Find the user detail by id
    const aboutUser = await About_User.findOne({
      userId: id,
    })
      .populate("userId", "firstName lastName email")
      .select("-__v");

    if (!aboutUser) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // If subsectionId is provided, update only that subsection (do not overwrite the whole array)
    if (
      section &&
      subsectionId &&
      data !== undefined &&
      Array.isArray(aboutUser[section])
    ) {
      // Find the index of the item to update
      const itemIndex = aboutUser[section].findIndex(
        (item) => item._id.toString() === subsectionId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Subsection item not found",
          section: section,
          subsectionId: subsectionId,
          data: data,
        });
      }

      // Only update the fields provided in data, keep the rest
      Object.keys(data).forEach((key) => {
        aboutUser[section][itemIndex][key] = data[key];
      });

      aboutUser.lastUpdated = new Date();
      await aboutUser.save();
    }

    // Populate userId for response
    await aboutUser.populate("userId", "firstName lastName email");

    res.status(200).json({ success: true, data: aboutUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: error.message });
  }
};

// Delete about user profile
export const deleteAboutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUser = await About_User.findByIdAndDelete(id);

    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About user profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting about user profile",
      error: error.message,
    });
  }
};

//Add Data to About User Section
export const addDataToAboutUserSection = async (req, res) => {
  try {
    const { userId, section, data } = req.body;
    const aboutUser = await About_User.findOne({ userId });

    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found",
      });
    }

    // Initialize section as array if it doesn't exist
    if (!aboutUser[section]) {
      aboutUser[section] = [];
    }

    // Add new data to the section array
    aboutUser[section].push(data);
    aboutUser.lastUpdated = new Date();
    await aboutUser.save();

    await aboutUser.populate("userId", "firstName lastName email");

    res.status(200).json({
      success: true,
      data: aboutUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding data to about user section",
      error: error.message,
    });
  }
};
