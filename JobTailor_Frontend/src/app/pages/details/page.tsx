import React from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Personal_Info from '@/components/cards/Personal_Info';
import Experience from '@/components/cards/Experience';

export default function Details() {
    return (
        <div className="h-full w-1/2 ">
            <ResizablePanelGroup direction="horizontal" className="rounded-lg border h-screen">
                <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col h-full overflow-y-scroll">
                    <Personal_Info />
                    <Experience />
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    );
}