import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import About_User from "./models/About_User.js";

dotenv.config();

// Sample data for testing
const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "password123"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    password: "password123"
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    username: "mikejohnson",
    email: "mike.johnson@example.com",
    password: "password123"
  }
];

const sampleAboutUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94105"
    },
    linkedinUrl: "https://linkedin.com/in/johndoe",
    portfolioUrl: "https://johndoe.dev",
    professionalSummary: "Experienced Full-Stack Developer with 4+ years of expertise in React, Node.js, and cloud technologies.",
    careerObjective: "Seeking a Senior Full-Stack Developer role where I can leverage my technical expertise and leadership skills.",
    workExperience: [
      {
        jobTitle: "Senior Full-Stack Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: new Date("2022-01-15"),
        endDate: null,
        isCurrent: true,
        description: "Lead development of enterprise web applications using React, Node.js, and AWS.",
        achievements: [
          "Led development of 3 major web applications serving 10,000+ users",
          "Improved application performance by 40% through optimization",
          "Mentored 2 junior developers who were promoted within 6 months"
        ],
        technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB", "TypeScript"],
        responsibilities: [
          "Architect and develop scalable web applications",
          "Code review and technical guidance for team members",
          "Implement best practices and coding standards"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: new Date("2016-09-01"),
        endDate: new Date("2020-05-15"),
        gpa: 3.8,
        relevantCoursework: [
          "Data Structures and Algorithms",
          "Software Engineering",
          "Database Systems",
          "Web Development"
        ],
        honors: ["Dean's List (2017-2020)"]
      }
    ],
    technicalSkills: {
      programmingLanguages: ["JavaScript", "TypeScript", "Python", "Java", "HTML/CSS"],
      frameworks: ["React", "Node.js", "Express.js", "Next.js", "Angular"],
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      tools: ["Git", "Docker", "Webpack", "Jest", "Postman"],
      cloudPlatforms: ["AWS", "Google Cloud", "Azure", "Heroku"],
      methodologies: ["Agile", "Scrum", "TDD", "CI/CD", "Microservices"]
    },
    softSkills: [
      "Leadership",
      "Team Collaboration",
      "Problem Solving",
      "Communication",
      "Time Management"
    ],
    languages: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Spanish",
        proficiency: "Intermediate"
      }
    ],
    jobPreferences: {
      desiredRole: ["Senior Full-Stack Developer", "Lead Developer", "Software Engineer"],
      preferredIndustries: ["Technology", "FinTech", "E-commerce", "Healthcare"],
      salaryRange: {
        min: 120000,
        max: 180000,
        currency: "USD"
      },
      workType: "Hybrid",
      relocation: true,
      travelPercentage: 10
    },
    careerGoals: {
      shortTerm: "Lead a team of 5+ developers and architect large-scale applications",
      longTerm: "Become a Technical Lead or Engineering Manager",
      targetPositions: ["Senior Full-Stack Developer", "Lead Developer", "Technical Lead"],
      targetCompanies: ["Google", "Meta", "Netflix", "Airbnb", "Stripe"]
    },
    isPublic: true
  }
];

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/JobTailor";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);

    // Clear existing collections
    await User.deleteMany({});
    await About_User.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create users and get their IDs
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`👤 Created user: ${savedUser.firstName} ${savedUser.lastName} (ID: ${savedUser._id})`);
    }

    // Create About_User profiles with proper user references
    for (let i = 0; i < sampleAboutUsers.length && i < createdUsers.length; i++) {
      const aboutUserData = {
        ...sampleAboutUsers[i],
        userId: createdUsers[i]._id
      };
      
      const aboutUser = new About_User(aboutUserData);
      await aboutUser.save();
      console.log(`📄 Created About_User profile for: ${aboutUserData.firstName} ${aboutUserData.lastName}`);
    }

    // Create additional About_User for remaining users
    for (let i = sampleAboutUsers.length; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const aboutUser = new About_User({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        location: {
          city: "New York",
          state: "NY",
          country: "USA",
          zipCode: "10001"
        },
        professionalSummary: `Experienced developer with expertise in modern web technologies.`,
        careerObjective: `Seeking opportunities to grow and contribute to innovative projects.`,
        technicalSkills: {
          programmingLanguages: ["JavaScript", "Python", "Java"],
          frameworks: ["React", "Node.js", "Express.js"],
          databases: ["MongoDB", "PostgreSQL"],
          tools: ["Git", "Docker", "VS Code"],
          cloudPlatforms: ["AWS", "Google Cloud"],
          methodologies: ["Agile", "Scrum"]
        },
        softSkills: ["Problem Solving", "Communication", "Teamwork"],
        languages: [
          {
            language: "English",
            proficiency: "Native"
          }
        ],
        jobPreferences: {
          desiredRole: ["Software Developer", "Full-Stack Developer"],
          preferredIndustries: ["Technology", "FinTech"],
          salaryRange: {
            min: 80000,
            max: 150000,
            currency: "USD"
          },
          workType: "Remote",
          relocation: false,
          travelPercentage: 5
        },
        careerGoals: {
          shortTerm: "Improve technical skills and contribute to meaningful projects",
          longTerm: "Become a senior developer and mentor others",
          targetPositions: ["Senior Developer", "Lead Developer"],
          targetCompanies: ["Tech companies"]
        },
        isPublic: true
      });
      
      await aboutUser.save();
      console.log(`📄 Created About_User profile for: ${user.firstName} ${user.lastName}`);
    }

    // Get database statistics
    const userCount = await User.countDocuments();
    const aboutUserCount = await About_User.countDocuments();
    
    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n📈 Database Statistics:");
    console.log(`- Users collection: ${userCount} documents`);
    console.log(`- About_User collection: ${aboutUserCount} documents`);
    
    // Show collections in database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📚 Collections in database:");
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    console.log("\n🔗 Test your API endpoints:");
    console.log("- GET http://localhost:5001/api/ (Server status)");
    console.log("- GET http://localhost:5001/api/users (All users)");
    console.log("- GET http://localhost:5001/api/about-users (All profiles)");
    console.log("- GET http://localhost:5001/api/users/:id (Specific user)");
    console.log("- GET http://localhost:5001/api/about-users/:id (Specific profile)");

  } catch (error) {
    console.error("❌ Error setting up database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run the setup
setupDatabase(); 