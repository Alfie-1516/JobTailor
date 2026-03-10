export type SectionTemplateItem = { key: string; label: string };

export const sectionTemplates: Record<string, SectionTemplateItem[]> = {
  personalInformation: [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "linkedin_url", label: "LinkedIn" },
    { key: "github_url", label: "GitHub" },
    { key: "portfolio_url", label: "Portfolio" },
  ],
};
