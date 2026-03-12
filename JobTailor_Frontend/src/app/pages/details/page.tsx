"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Card from "@/components/cards/card";
import { getUserDetails, getWorkExperience } from "@/api/user";
import {
  mapWorkExperienceResponseToCardItems,
  type WorkExperienceApiResponse,
  type WorkExperienceApiRow,
} from "@/mappers/workExperience";
import CardVariation1 from "@/components/cards/card_templates/card_variation_1";
import CardVariation2 from "@/components/cards/card_templates/card_variation_2";
import { Empty } from "antd";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import isLoggedInCheck, { LoggedInUser } from "@/api/isLoggedIn";
import { Briefcase, User } from "lucide-react";
import { personalInformation, workExperience } from "@/components/templates/formTemplates";

export default function Details() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>({});
  const [workExperienceList, setWorkExperienceList] = useState<WorkExperienceApiResponse>({message: "", data: []});
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
  useEffect(() => {
    isLoggedInCheck().then((result) => {
      setAuth(result);
      if (result.user) {
        fetchUserDetails();
        fetchWorkExperience();
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
      <ScrollArea className="rounded-lg border h-full p-4 ">
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
          template={workExperience}
          templateName="workExperience"
          title="Work Experience"
          subtitle="Work Experience"
          icon={<Briefcase />}
          onSave={fetchWorkExperience}
        />
      </ScrollArea>
    </div>
  );
}
