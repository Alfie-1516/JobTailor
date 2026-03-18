"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCertifications, getEducation, getUserDetails, getWorkExperience, getProjects, getSkills } from "@/api/user";
import { type WorkExperienceApiResponse } from "@/mappers/workExperience";
import CardVariation1 from "@/components/cards/card_templates/card_variation_1";
import CardVariation2 from "@/components/cards/card_templates/card_variation_2";
import CardVariation3 from "@/components/cards/card_templates/card_variation_3";
import { Empty } from "antd";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import isLoggedInCheck, { LoggedInUser } from "@/api/isLoggedIn";
import { Award, Briefcase, FolderGit2, GraduationCap, Lightbulb, User } from "lucide-react";
import { personalInformation } from "@/components/templates/formTemplates";
import { CertificationApiResponse } from "@/mappers/certification";
import { EducationApiResponse } from "@/mappers/education";
import { ProjectApiResponse } from "@/mappers/project";
import { SkillApiResponse } from "@/mappers/skill";

export default function Details() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>({});
  const [workExperienceList, setWorkExperienceList] = useState<WorkExperienceApiResponse>({ message: "", data: [] });
  const [educationList, setEducationList] = useState<EducationApiResponse>({ message: "", data: [] });
  const [projectList, setProjectList] = useState<ProjectApiResponse>({ message: "", data: [] });
  const [certificationList, setCertificationList] = useState<CertificationApiResponse>({ message: "", data: [] });
  const [skillsList, setSkillsList] = useState<SkillApiResponse>({ message: "", data: [] });

  const [auth, setAuth] = useState<{
    isLoggedIn: boolean;
    user: LoggedInUser | null;
  }>({
    isLoggedIn: false,
    user: null,
  });

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchWorkExperience = async () => {
    try {
      const workExperience = (await getWorkExperience()) as WorkExperienceApiResponse;
      setWorkExperienceList(workExperience);

    } catch (error) {
      console.error("Error fetching work experience:", error);
    }
  };


  const fetchEducation = async () => {
    try {
      const education = (await getEducation()) as EducationApiResponse;
      setEducationList(education);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const projects = (await getProjects()) as ProjectApiResponse;
      setProjectList(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchCertifications = async () => {
    try {
      const certifications = (await getCertifications()) as CertificationApiResponse;
      setCertificationList(certifications);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const skills = (await getSkills()) as SkillApiResponse;
      setSkillsList(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    isLoggedInCheck().then((result) => {
      setAuth(result);
      if (result.user) {
        fetchUserDetails();
        fetchWorkExperience();
        fetchEducation();
        fetchProjects();
        fetchCertifications();
        fetchSkills();
      }
    });
  }, []);


  if (!auth.user) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <Empty description="No user details found" />
        <Button
          className="w-[10rem]"
          variant={"default"}
          onClick={() => router.push(routes.login)}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ScrollArea className="rounded-lg border h-full p-4">
        <div className="flex flex-col gap-6">
        <CardVariation1
          data={userDetails}
          template={personalInformation}
          templateName="personalInformation"
          title="Personal Information"
          subtitle="Basic Details"
          icon={<User />}
        />
        <CardVariation2
          apiResponse={workExperienceList}
          templateName="workExperience"
          title="Work Experience"
          subtitle="Work Experience"
          icon={<Briefcase />}
          onSave={fetchWorkExperience}
        />
        
        <CardVariation2
          apiResponse={educationList}
          templateName="education"
          title="Education"
          subtitle="Education"
          icon={<GraduationCap />}
          onSave={fetchEducation}
        />
        <CardVariation2
          apiResponse={projectList}
          templateName="project"
          title="Projects"
          subtitle="Projects"
          icon={<FolderGit2 />}
          onSave={fetchProjects}
        />
        <CardVariation2
          apiResponse={certificationList}
          templateName="certification"
          title="Certifications"
          subtitle="Certifications"
          icon={<Award />}
          onSave={fetchCertifications}
        />
        <CardVariation3
          apiResponse={skillsList}
          title="Skills"
          subtitle="SKILLS"
          icon={<Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />}
          onSave={fetchSkills}
        />
        </div>
      </ScrollArea>
    </div>
  );
}
