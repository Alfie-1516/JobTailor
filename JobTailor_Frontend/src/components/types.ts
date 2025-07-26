// TypeScript type definitions for About_User model

export interface WorkExperience {
  _id?: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description?: string;
  achievements?: string[];
  technologies?: string[];
  responsibilities?: string[];
}

export interface Education {
  _id?: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  gpa?: number;
  relevantCoursework?: string[];
  honors?: string[];
}

export interface TechnicalSkills {
  programmingLanguages?: string[];
  frameworks?: string[];
  databases?: string[];
  tools?: string[];
  cloudPlatforms?: string[];
  methodologies?: string[];
}

export interface Language {
  language: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  dateObtained?: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description?: string;
  technologies?: string[];
  url?: string;
  githubUrl?: string;
  startDate?: Date;
  endDate?: Date;
  highlights?: string[];
}

export interface Achievement {
  _id?: string;
  title: string;
  description?: string;
  date?: Date;
  issuer?: string;
}

export interface JobPreferences {
  desiredRole?: string[];
  preferredIndustries?: string[];
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  workType?: 'Remote' | 'On-site' | 'Hybrid';
  relocation?: boolean;
  travelPercentage?: number;
}

export interface CareerGoals {
  shortTerm?: string;
  longTerm?: string;
  targetPositions?: string[];
  targetCompanies?: string[];
}

export interface VolunteerExperience {
  _id?: string;
  organization: string;
  role: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface Publication {
  _id?: string;
  title: string;
  authors?: string[];
  publication?: string;
  date?: Date;
  url?: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// Main About_User interface
export interface AboutUser {
  _id?: string;
  userId?: string;
  
  // Personal Information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: Location;
  linkedinUrl?: string;
  portfolioUrl?: string;
  
  // Professional Summary
  professionalSummary?: string;
  careerObjective?: string;
  
  // Work Experience
  workExperience?: WorkExperience[];
  
  // Education
  education?: Education[];
  
  // Skills
  technicalSkills?: TechnicalSkills;
  softSkills?: string[];
  languages?: Language[];
  
  // Certifications
  certifications?: Certification[];
  
  // Projects
  projects?: Project[];
  
  // Achievements & Awards
  achievements?: Achievement[];
  
  // Job Preferences
  jobPreferences?: JobPreferences;
  
  // Career Goals
  careerGoals?: CareerGoals;
  
  // Additional Information
  volunteerExperience?: VolunteerExperience[];
  publications?: Publication[];
  
  // Metadata
  lastUpdated?: Date;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface AboutUserResponse extends ApiResponse<AboutUser> {}
export interface AboutUsersResponse extends ApiResponse<AboutUser[]> {}
