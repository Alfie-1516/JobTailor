"use client";

import { routes } from "@/constants/routes";
import React from "react";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

import { useRouter } from "next/navigation";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Tabs } from "antd";
import { Menu } from "lucide-react";
export default function CustomHeader() {
    const router = useRouter();



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
                    <ResizablePanel defaultSize={25} className="flex justify-start items-center text-green-500 font-bold text-xl">Job Tailor</ResizablePanel>
                    <ResizablePanel defaultSize={50} className="justify-center items-center w-[20px] hidden md:flex">
                        {/* Desktop Navigation */}
                        <Tabs
                            defaultActiveKey="home"
                            onChange={(key) => {
                                if (key === 'home') router.push(routes.home);
                                if (key === 'dashboard') router.push(routes.dashboard);
                                if (key === 'details') router.push(routes.details);
                            }}
                            items={[
                                {
                                    key: 'home',
                                    label: 'Home',
                                },
                                {
                                    key: 'dashboard',
                                    label: 'Dashboard',
                                },
                                {
                                    key: 'details',
                                    label: 'Details',
                                }
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
                    </ResizablePanel>


                    <ResizablePanel defaultSize={25} className="flex justify-end items-center ">
                        <Button className="bg-green-500 text-white" onClick={() => router.push(routes.login)}>Get Started</Button>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    );


}
