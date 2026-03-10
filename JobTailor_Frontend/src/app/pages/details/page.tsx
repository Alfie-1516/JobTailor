"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Card from "@/components/cards/card";
import { getUserDetails, getWorkExperience } from "@/api/user";
import {
  mapWorkExperienceResponseToCardItems,
  type WorkExperienceApiResponse,
} from "@/mappers/workExperience";
import { Empty } from "antd";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import isLoggedInCheck, { LoggedInUser } from "@/api/isLoggedIn";
import { Briefcase, User } from "lucide-react";

export default function Details() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>({});
  const [workExperienceList, setWorkExperienceList] = useState<any[]>([]);
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
      const res = (await getWorkExperience()) as WorkExperienceApiResponse;
      const items = mapWorkExperienceResponseToCardItems(res);
      setWorkExperienceList(items);
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
        <Card
          data={userDetails}
          title="Personal Information"
          subtitle="Basic Details"
          baseName="personalInformation"
          icon={<User />}
          onSaveSuccess={fetchUserDetails}
        />
        <Card
          data={workExperienceList}
          title="Work Experience"
          subtitle="Work Experience"
          baseName="workExperience"
          onSaveSuccess={fetchWorkExperience}
          icon={<Briefcase />}
        />
      </ScrollArea>
    </div>
  );
}
