import About_User from "../models/About_User.js";

// Get all about user profiles
export const getAllAboutUsers = async (req, res) => {
  try {
    const aboutUsers = await About_User.find({ isPublic: true })
      .populate('userId', 'firstName lastName email')
      .select('-__v');
    
    res.status(200).json({
      success: true,
      count: aboutUsers.length,
      data: aboutUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about users",
      error: error.message
    });
  }
};

// Get about user profile by ID
export const getAboutUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUser = await About_User.findById(id)
      .populate('userId', 'firstName lastName email')
      .select('-__v');
    
    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: aboutUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about user",
      error: error.message
    });
  }
};

// Get about user profile by user ID
export const getAboutUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const aboutUser = await About_User.findOne({ userId })
      .populate('userId', 'firstName lastName email')
      .select('-__v');
    
    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: aboutUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about user",
      error: error.message
    });
  }
};

// Create new about user profile
export const createAboutUser = async (req, res) => {
  try {
    const aboutUserData = req.body;
    
    // Check if profile already exists for this user
    const existingProfile = await About_User.findOne({ userId: aboutUserData.userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user"
      });
    }
    
    const aboutUser = new About_User(aboutUserData);
    const savedAboutUser = await aboutUser.save();
    
    const populatedAboutUser = await About_User.findById(savedAboutUser._id)
      .populate('userId', 'firstName lastName email');
    
    res.status(201).json({
      success: true,
      data: populatedAboutUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating about user profile",
      error: error.message
    });
  }
};

// Update about user profile
export const updateAboutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Update lastUpdated timestamp
    updateData.lastUpdated = new Date();
    
    const aboutUser = await About_User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email');
    
    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: aboutUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating about user profile",
      error: error.message
    });
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
        message: "About user profile not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "About user profile deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting about user profile",
      error: error.message
    });
  }
};




// Update specific sections of about user profile
export const updateAboutUserSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { section, data } = req.body;
    
    const updateData = {
      [section]: data,
      lastUpdated: new Date()
    };
    
    const aboutUser = await About_User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email');
    
    if (!aboutUser) {
      return res.status(404).json({
        success: false,
        message: "About user profile not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: aboutUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating about user section",
      error: error.message
    });
  }
};
