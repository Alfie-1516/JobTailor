"use client";
import type React from "react";
import CardVariation1 from "./card_templates/card_variation_1";
import CardVariation2 from "./card_templates/card_variation_2";
import {
  personalInformation,
  workExperience,
} from "@/components/templates/formTemplates";

export type CardProps = {
  /** Single record (e.g. user details) or list (e.g. work experience) */
  data: Record<string, string|number|boolean|null|undefined>;
  title: string;
  subtitle: string;
  baseName: string;
  icon: React.ReactNode;
  onSaveSuccess?: () => void;
};

export default function Card({
  data,
  title,
  subtitle,
  baseName,
  icon,
  onSaveSuccess,
}: CardProps) {
  const template = getTemplate(baseName);
  return (
    <div className="bg-white rounded-lg6 mb-4 ">
      {baseName === "personalInformation" && (
        <CardVariation1
          data={data}
          template={template}
          templateName={baseName}
          title={title}
          subtitle={subtitle}
          icon={icon}
          onSave={onSaveSuccess ? () => onSaveSuccess() : undefined}
        />
      )}
      {baseName === "workExperience" && (
        <CardVariation2
          data={data}
          template={template}
          templateName={baseName}
          title={title}
          subtitle={subtitle}
          icon={icon}
          onSave={onSaveSuccess ? () => onSaveSuccess() : undefined}
        />
      )}
    </div>
  );
}


function getTemplate(baseName: string) {
  switch (baseName) {
    case "personalInformation":
      return personalInformation;
    case "workExperience":
      return workExperience;
    default:
      return workExperience;
  }
}
