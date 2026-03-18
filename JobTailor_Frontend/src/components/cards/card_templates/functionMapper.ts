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
  addSkill,
  updateSkill,
  deleteSkill,
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
  formatSkill,
  formatSkillEditFields,
} from "./formatter";

/** Templates wired for add/update/delete in card grids (variation 3). */
export function templateHasGridCrud(baseName: string): boolean {
  return (
    baseName === "skill" ||
    baseName === "workExperience" ||
    baseName === "education" ||
    baseName === "project" ||
    baseName === "certification"
  );
}

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
    case "skill":
      return formatSkill;
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
    case "skill":
      return formatSkillEditFields;
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
    case "skill":
      return updateSkill;
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
    case "skill":
      return addSkill;
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
    case "skill":
      return deleteSkill;
    default:
      return () => {};
  }
};