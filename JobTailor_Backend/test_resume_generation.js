import fetch from "node-fetch";

const testData = {
  jobDescription:
    "We are seeking a passionate Frontend Developer to join our dynamic team. The ideal candidate will have 3+ years of experience with React, JavaScript, and modern web technologies. Responsibilities include developing responsive user interfaces, collaborating with design teams, and optimizing application performance. Experience with TypeScript, Next.js, and state management libraries is a plus. We offer competitive salary, remote work options, and excellent growth opportunities.",
  userDetails: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: "4 years of frontend development experience",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "HTML/CSS",
      "Git",
      "REST APIs",
    ],
    education: "Bachelor's in Computer Science, University of California",
    currentRole: "Frontend Developer at TechCorp",
    achievements: [
      "Led development of 3 major web applications",
      "Improved page load times by 40%",
      "Mentored 2 junior developers",
    ],
    interests:
      "Open source contributions, UI/UX design, performance optimization",
  },
};

async function testResumeGeneration() {
  try {
    console.log("Testing resume generation...");
    console.log("Request data:", JSON.stringify(testData, null, 2));

    const response = await fetch("http://localhost:5001/api/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("\n=== RESPONSE ===");
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log("\n✅ Resume generation successful!");
    } else {
      console.log("\n❌ Resume generation failed");
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testResumeGeneration();
