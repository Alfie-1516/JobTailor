"use client";

import { routes } from "@/constants/routes";
import React, { useEffect, useState } from "react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

import { useRouter, usePathname } from "next/navigation";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Tabs } from "antd";
import { Menu } from "lucide-react";
import { getUser } from "@/api/user";
import { User } from "@supabase/supabase-js";
export default function CustomHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState("home");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);


  useEffect(() => {
    if (pathname === routes.home) {
      setActiveKey("home");
    } else if (pathname === routes.dashboard) {
      setActiveKey("dashboard");
    } else if (pathname === routes.details) {
      setActiveKey("details");
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
      <div className="flex  w-full h-16 mr-20">
        <ResizablePanelGroup direction="horizontal" className="flex justify-between w-full items-center">
          <ResizablePanel defaultSize={25} className="flex justify-start items-center text-green-500 font-bold text-xl">
            Job Tailor
          </ResizablePanel>
          <ResizablePanel defaultSize={50} className="justify-center items-center w-[20px]  md:flex">
            {/* Desktop Navigation */}
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              items={[
                {
                  key: "home",
                  label: "Home",
                },
                {
                  key: "dashboard",
                  label: "Dashboard",
                },
                {
                  key: "details",
                  label: "Details",
                },
              ]}
            />
          </ResizablePanel>
          <ResizablePanel defaultSize={50} className="flex justify-center items-center w-[20px] lg:hidden md:hidden">
            {/* Mobile Navigation */}
            <Menubar className="md:hidden border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="font-normal">
                  <Menu className="h-5 w-5" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => router.push(routes.home)}>Home</MenubarItem>
                  <MenubarItem onClick={() => router.push(routes.dashboard)}>Dashboard</MenubarItem>
                  <MenubarItem onClick={() => router.push(routes.details)}>Details</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </ResizablePanel>

          <ResizablePanel defaultSize={25} className="flex justify-end items-center ">
            <Button className="bg-green-500 text-white rounded-full" >
              Logout
            </Button>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
