import { updateWorkExperience, deleteWorkExperience } from "@/api/user";
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
