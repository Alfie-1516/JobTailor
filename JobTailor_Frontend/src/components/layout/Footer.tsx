"use client";
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import React from 'react';
export default function CustomFooter() {
    return (
        <footer
            className="flex  w-full h-5 "
        >
            <ResizablePanelGroup direction="horizontal" className="flex  items-center">
                <ResizablePanel className="text-xs">Job Tailor ©{new Date().getFullYear()} - Your Personalized Job Search Platform</ResizablePanel>
            </ResizablePanelGroup>

        </footer>
    );
}