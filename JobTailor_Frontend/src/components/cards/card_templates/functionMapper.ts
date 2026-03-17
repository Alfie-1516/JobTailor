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
} from "@/api/user";
import {
  formatWorkExperience,
  formatWorkExperienceEditFields,
  formatEducation,
  formatEducationEditFields,
  formatProject,
  formatProjectEditFields,
} from "./formatter";


export const getFormatFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return formatWorkExperience;
    case "education":
      return formatEducation;
    case "project":
      return formatProject;
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
    default:
      return () => {};
  }
};