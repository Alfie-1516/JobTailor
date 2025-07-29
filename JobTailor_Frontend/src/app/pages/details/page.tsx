"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Card from "@/components/cards/card";
import { get_user_details } from "@/api";
import { useUser } from "@/context/UserContext";

export default function Details() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserDetails = async () => {
      try {
        const details = await get_user_details(user._id);
        if (details.success) {
          setUserDetails(details.data);
        } else {
          // No user details found - this is normal for new users
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
    
  }, [user?._id]);

  return (
    <div className="h-full w-1/2 ">
      <ScrollArea className="rounded-lg border h-full p-4 ">
     
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
