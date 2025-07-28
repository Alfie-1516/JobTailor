import mongoose from "mongoose";

const aboutUserSchema = new mongoose.Schema(
  {
    // Personal Information

    personalInformation: [
      {
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
        },
        phone: {
          type: String,
          trim: true,
        },
        location: {
          city: String,
          state: String,
          country: String,
          zipCode: String,
        },
        linkedinUrl: {
          type: String,
          trim: true,
        },
        portfolioUrl: {
          type: String,
          trim: true,
        },
        githubUrl: {
          type: String,
          trim: true,
        },
      },
    ],

    // Professional Summary
    professionalSummary: {
      type: String,
      maxlength: 500,
    },

    // Work Experience
    workExperience: [
      {
        jobTitle: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: String,
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
        isCurrent: {
          type: Boolean,
          default: false,
        },
        description: String,
        achievements: [String],
        technologies: [String],
        responsibilities: [String],
      },
    ],

    // Education
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
        minor: {
          type: String,
          required: false,
        },
        startDate: String,
        endDate: String,
      },
    ],

    // Skills
    technicalSkills: {
      programmingLanguages: String,
      frameworks: String,
      databases: String,
      tools: String,
      softwares: String,
      cloudPlatforms: String,
      methodologies: String,
    },
    languages: [
      {
        language: String,
        proficiency: {
          type: String,
        },
      },
    ],

    // Certifications
    certifications: [
      {
        name: String,
        issuer: String,
        dateObtained: Date,
        expiryDate: Date,
        credentialId: String,
        url: String,
      },
    ],

    // Projects
    projects: [
      {
        projectName: String,
        description: String,
        technologies: String,
        url: String,
        githubUrl: String,
        startDate: Date,
        endDate: Date,
        highlights: String,
      },
    ],

    // Achievements & Awards
    achievements: [
      {
        title: String,
        description: String,
        date: String,
      },
    ],

    // Additional Information
    volunteerExperience: [
      {
        organization: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    // Metadata
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
aboutUserSchema.index({ userId: 1 });
aboutUserSchema.index({ email: 1 });
aboutUserSchema.index({ "jobPreferences.desiredRole": 1 });
aboutUserSchema.index({ "technicalSkills.programmingLanguages": 1 });

const About_User = mongoose.model("About_User", aboutUserSchema);

export default About_User;
