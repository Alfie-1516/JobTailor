"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AboutUser, AboutUserResponse } from "@/components/types";
import Card from "@/components/cards/card";
import { get_user_details, create_user_details } from "@/api";
import { useUser } from "@/context/UserContext";
import { useRef } from "react";

export default function Details() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const hasRun = useRef(false);
  const [workExperience, setWorkExperience] = useState<
    AboutUser["workExperience"]
  >([]);
  useEffect(() => {
    if (!user?._id) return;

    const fetchUserDetails = async () => {
      const details = await get_user_details(user._id);
      setUserDetails(details.data);
    };

    fetchUserDetails();
  }, [user?._id]);

  return (
    <div className="h-full w-1/2 ">
      <ScrollArea className="rounded-lg border h-full p-4 ">
        {/* {userDetails?.map((item: any) => (
          <div key={item._id}>
            <h1>{item.name.label}</h1>
            <p>{item.name.value}</p>
          </div>
        ))} */}
        {Object.keys(userDetails || {}).map((key) => {
          if (
            [
              "_id",
              "userId",
              "createdAt",
              "updatedAt",
              "lastUpdated",
              "isPublic",
            ].includes(key)
          ) {
            return null;
          }

          const displayName =
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, " $1");

          return (
            <Card
              key={key}
              userId={userDetails.userId._id}
              information={userDetails[key] || []}
              title={displayName}
              baseName={key}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
}
