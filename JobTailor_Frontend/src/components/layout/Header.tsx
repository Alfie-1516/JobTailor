"use client";

import { routes } from "@/constants/routes";
import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs } from "antd";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import isLoggedInCheck, { type LoggedInUser } from "@/api/isLoggedIn";
import { signOut } from "@/auth/signOut";

function getInitials(user: LoggedInUser): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  if (user.email) {
    return user.email.slice(0, 2).toUpperCase();
  }
  return "?";
}

export default function CustomHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState("home");
  const [auth, setAuth] = useState<{
    isLoggedIn: boolean;
    user: LoggedInUser | null;
  }>({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    isLoggedInCheck().then(setAuth);
  }, [auth]);

  const isLoggedIn = auth.isLoggedIn;

  useEffect(() => {
    if (pathname === routes.home) {
      setActiveKey("home");
    } else if (pathname === routes.dashboard) {
      setActiveKey("dashboard");
    } else if (pathname === routes.details) {
      setActiveKey("details");
    }else if(pathname === routes.login) {
      setActiveKey("login");
    }else if(pathname === routes.signup) {
      setActiveKey("signup");
    }
  }, [pathname]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    if (key === "home") router.push(routes.home);
    if (key === "dashboard") router.push(routes.dashboard);
    if (key === "details") router.push(routes.details);
  };

  return (
    <>
      <style>
        {`
          .ant-tabs-tab.ant-tabs-tab-active {
              color: #22c55e !important;
          }
          .ant-tabs-tab-active .ant-tabs-tab-btn {
              color: #22c55e !important;
          }
          .ant-tabs-ink-bar {
              background-color: #22c55e !important;
          }
          .ant-tabs-tab:hover {
              color: #22c55e !important;
          }
          .ant-tabs-tab:hover .ant-tabs-tab-btn {
              color: #22c55e !important;
          }
      `}
      </style>
      <div className="flex w-full h-16 mr-20 items-center justify-between gap-4">
        <div className="flex shrink-0 items-center text-green-500 font-bold text-xl">
          Job Tailor
        </div>

        <div className="hidden flex-1 justify-center items-center min-w-0 md:flex">
          {/* Desktop Navigation */}
          <Tabs
            activeKey={activeKey}
            onChange={handleTabChange}
            items={[
              { key: "home", label: "Home" },
              { key: "dashboard", label: "Dashboard" },
              { key: "details", label: "Details" },
            ]}
          />
        </div>

        <div className="flex md:hidden shrink-0 items-center justify-center">
          {/* Mobile Navigation */}
          <Menubar className="border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="font-normal">
                <Menu className="h-5 w-5" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => router.push(routes.home)}>
                  Home
                </MenubarItem>
                <MenubarItem onClick={() => router.push(routes.dashboard)}>
                  Dashboard
                </MenubarItem>
                <MenubarItem onClick={() => router.push(routes.details)}>
                  Details
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2">
          {isLoggedIn ? (
            <>
              {auth.user && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-green-500 text-green-600 font-semibold shrink-0"
                  aria-label={
                    `Signed in as ${auth.user.firstName} ${auth.user.lastName}`.trim() ||
                    auth.user.email
                  }
                >
                  {getInitials(auth.user)}
                </Button>
              )}
              <Button
                className="bg-green-500 text-white rounded-full"
                onClick={() => {
                  signOut();
                  router.push(routes.home);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-green-500 text-white rounded-full"
              onClick={() => router.push(routes.signup)}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
