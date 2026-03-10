"use client";
import type React from "react";
import {
  sectionTemplates,
  type SectionTemplateItem,
} from "@/components/templates/personalInformation";
import CardVariation1 from "./card_templates/card_variation_1";
import { Button } from "../ui/button";

export default function Card({
  userId,
  information,
  title,
  subtitle,
  baseName,
  canAddFields,
  icon,
  onSaveSuccess,
}: {
  userId: string;
  information: any[];
  title: string;
  baseName: string;
  canAddFields: boolean;
  subtitle: string;
  icon?: React.ReactNode;
  onSaveSuccess?: () => void;
}) {
  const template = sectionTemplates[baseName];
  if (!template) return null;

  return (
    <div className="bg-white rounded-lg6 mb-4 ">
      {canAddFields && <Button variant="outline">Add Field</Button>}
      {information.map((item, index) =>
        baseName === "personalInformation" ? (
          <CardVariation1
            key={index}
            item={item}
            template={template}
            templateName={baseName}
            title={title}
            subtitle={subtitle}
            icon={icon}
            onSave={onSaveSuccess ? () => onSaveSuccess() : undefined}
          />
        ) : (
            <p className="text-gray-500">No information available</p>
        )
      )}

      {information.length === 0 && <div>No information available</div>}
    </div>
  );
}


