export function EmptyForms({
  baseName,
  form,
  setForm,
}: {
  baseName: string;
  form: Record<string, string>;
  setForm: (form: Record<string, string>) => void;
}) {
  const getForm = (baseName: string) => {
    switch (baseName) {
      case "workExperience":
        return WorkExperienceForm;
      case "education":
        return EducationForm;
      case "skills":
        return SkillsForm;
      case "projects":
        return ProjectsForm;
      case "certifications":
        return CertificationsForm;
      case "achievements":
        return AchievementsForm;
      case "languages":
        return LanguagesForm;
      case "technicalSkills":
        return TechnicalSkillsForm;
      case "personalInformation":
        return PersonalInformationForm;
      case "volunteerExperience":
        return VolunteerExperienceForm;
      default:
        return [];
    }
  };
  if (baseName === "workExperience") {
  }
  return (
    <div className="space-y-4">
      {getForm(baseName)?.map((item: string) => (
        <div key={item} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {item.charAt(0).toUpperCase() +
              item.slice(1).replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={`Enter ${item.toLowerCase()}`}
            value={form[item] || ""}
            onChange={(e) => {
              setForm({ ...form, [item]: e.target.value });
            }}
          />
        </div>
      ))}
    </div>
  );
}

const TechnicalSkillsForm = [
  "programmingLanguages",
  "frameworks",
  "softwares",
  "databases",
  "tools",
  "cloudPlatforms",
  "methodologies",
];

const WorkExperienceForm = [
  "jobTitle",
  "company",
  "startDate",
  "endDate",
  "isCurrent",
  "description",
  "technologies",
  "responsibilities",
];
const PersonalInformationForm = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
];

const EducationForm = [
  "school",
  "degree",
  "major",
  "minor",
  "startDate",
  "endDate",
];
export const SkillsForm = ["skill", "level"];
export const ProjectsForm = [
  "projectName",
  "highlights",
  "description",
  "technologies",
  "url",
  "githubUrl",
  "startDate",
  "endDate",
];
export const CertificationsForm = [
  "certificationName",
  "issuingOrganization",
  "issueDate",
];

const AchievementsForm = ["title", "description", "date"];

export const LanguagesForm = ["language", "proficiency"];
const VolunteerExperienceForm = [
  "organization",
  "role",
  "startDate",
  "endDate",
  "description",
];
