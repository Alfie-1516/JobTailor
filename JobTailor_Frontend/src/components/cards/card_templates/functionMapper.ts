import {
  updateWorkExperience,
  deleteWorkExperience,
  addWorkExperience,
  updateEducation,
  deleteEducation,
  addEducation,
  addProject,
  updateProject,
  deleteProject,
  addCertification,
  updateCertification,
  deleteCertification,
} from "@/api/user";
import {
  formatWorkExperience,
  formatWorkExperienceEditFields,
  formatEducation,
  formatEducationEditFields,
  formatProject,
  formatProjectEditFields,
  formatCertification,
  formatCertificationEditFields,
} from "./formatter";


export const getFormatFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return formatWorkExperience;
    case "education":
      return formatEducation;
    case "project":
      return formatProject;
    case "certification":
      return formatCertification;
    default:
      return () => ({
        entryTitle: "",
        entrySubtitle: "",
        chipRows: [],
        bodyField: [],
      });
  }
};

export const getEditFormatFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return formatWorkExperienceEditFields;
    case "education":
      return formatEducationEditFields;
    case "project":
      return formatProjectEditFields;
    case "certification":
      return formatCertificationEditFields;
    default:
      return () => [];
  }
};


export const getUpdateFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return updateWorkExperience;
    case "education":
      return updateEducation;
    case "project":
      return updateProject;
    case "certification":
      return updateCertification;
    default:
      return () => {};
  }
};

export const getAddFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return addWorkExperience;
    case "education":
      return addEducation;
    case "project":
      return addProject;
    case "certification":
      return addCertification;
    default:
      return () => {};
  }
};

export const getDeleteFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return deleteWorkExperience;
    case "education":
      return deleteEducation;
    case "project":
      return deleteProject;
    case "certification":
      return deleteCertification;
    default:
      return () => {};
  }
};