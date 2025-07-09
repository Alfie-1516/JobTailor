"use client";

import { routes } from "@/constants/routes";
import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";

export default function CustomHeader() {
    const { Header } = Layout;
    const router = useRouter();

    const items = [
        {
            key: routes.home,
            label: 'Home',
            onClick: () => router.push(routes.home),
        },
        {
            key: routes.about,
            label: 'About',
            onClick: () => router.push(routes.about),
        },
        {
            key: routes.contact,
            label: 'Contact',
            onClick: () => router.push(routes.contact),
        },
        {
            key: routes.login,
            label: 'Login',
            onClick: () => router.push(routes.login),
        },
        
    ];

    return (
        <Header className="sticky top-0 z-10 w-full  flex justify-start items-center pl-20 pr-20">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={[routes.home]}
                items={items}
                className="flex-1 min-w-0"
            />
        </Header>
    );
}
