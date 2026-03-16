import {
  updateWorkExperience,
  deleteWorkExperience,
  addWorkExperience,
  updateEducation,
  deleteEducation,
  addEducation,
} from "@/api/user";
import {
  formatWorkExperience,
  formatWorkExperienceEditFields,
  formatEducation,
  formatEducationEditFields,
} from "./formatter";


export const getFormatFunction = (baseName: string) => {
    switch (baseName) {
        case "workExperience":
            return formatWorkExperience;
        case "education":
            return formatEducation;
        default:
            return () => ({
                entryTitle: "",
                entrySubtitle: "",
                chipRows: [],
                bodyField: [],
            });
    }
}

export const getEditFormatFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return formatWorkExperienceEditFields;
    case "education":
      return formatEducationEditFields;
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
    default:
      return () => {};
  }
};