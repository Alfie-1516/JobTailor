import mongoose from "mongoose";

const aboutUserSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  linkedinUrl: {
    type: String,
    trim: true
  },
  portfolioUrl: {
    type: String,
    trim: true
  },

  // Professional Summary
  professionalSummary: {
    type: String,
    maxlength: 500
  },
  careerObjective: {
    type: String,
    maxlength: 300
  },

  // Work Experience
  workExperience: [{
    jobTitle: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: String,
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    isCurrent: {
      type: Boolean,
      default: false
    },
    description: String,
    achievements: [String],
    technologies: [String],
    responsibilities: [String]
  }],

  // Education
  education: [{
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    location: String,
    startDate: Date,
    endDate: Date,
    gpa: Number,
    relevantCoursework: [String],
    honors: [String]
  }],

  // Skills
  technicalSkills: {
    programmingLanguages: [String],
    frameworks: [String],
    databases: [String],
    tools: [String],
    cloudPlatforms: [String],
    methodologies: [String]
  },
  softSkills: [String],
  languages: [{
    language: String,
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Native']
    }
  }],

  // Certifications
  certifications: [{
    name: String,
    issuer: String,
    dateObtained: Date,
    expiryDate: Date,
    credentialId: String,
    url: String
  }],

  // Projects
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    url: String,
    githubUrl: String,
    startDate: Date,
    endDate: Date,
    highlights: [String]
  }],

  // Achievements & Awards
  achievements: [{
    title: String,
    description: String,
    date: Date,
    issuer: String
  }],

  // Job Preferences
  jobPreferences: {
    desiredRole: [String],
    preferredIndustries: [String],
    salaryRange: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    workType: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'On-site'
    },
    relocation: {
      type: Boolean,
      default: false
    },
    travelPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },

  // Career Goals
  careerGoals: {
    shortTerm: String,
    longTerm: String,
    targetPositions: [String],
    targetCompanies: [String]
  },

  // Additional Information
  volunteerExperience: [{
    organization: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  
  publications: [{
    title: String,
    authors: [String],
    publication: String,
    date: Date,
    url: String
  }],

  // Metadata
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
aboutUserSchema.index({ userId: 1 });
aboutUserSchema.index({ email: 1 });
aboutUserSchema.index({ 'jobPreferences.desiredRole': 1 });
aboutUserSchema.index({ 'technicalSkills.programmingLanguages': 1 });

const About_User = mongoose.model('About_User', aboutUserSchema);

export default About_User;
