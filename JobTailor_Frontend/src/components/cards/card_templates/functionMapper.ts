import {
  updateWorkExperience,
  deleteWorkExperience,
  addWorkExperience,
} from "@/api/user";
import {
    formatWorkExperience,
    formatWorkExperienceEditFields,
  } from "./formatter";


export const getFormatFunction = (baseName: string) => {
    switch (baseName) {
        case "workExperience":
            return formatWorkExperience;
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
        default:
            return () => [];
    }
}


export const getUpdateFunction = (baseName: string) => {
    switch (baseName) {
        case "workExperience":
            return updateWorkExperience;
        default:
            return () => {};
    }
}

export const getAddFunction = (baseName: string) => {
  switch (baseName) {
    case "workExperience":
      return addWorkExperience;
    default:
      return () => {};
  }
};

export const getDeleteFunction = (baseName: string) => {
    switch (baseName) {
        case "workExperience":
            return deleteWorkExperience;
        default:
            return () => {};
    }
}