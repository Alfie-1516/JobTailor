"use client"
import { useState } from 'react';
import { Pen } from 'lucide-react';
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Personal_Info() {
    const [personalInfo, setPersonalInfo] = useState({
        name: { label: 'Name', value: 'Alok Kumar' },
        email: { label: 'Email', value: 'alokkumar@gmail.com' },
        phone: { label: 'Phone', value: '9876543210' },
        address: { label: 'Address', value: '123, Main Street, Anytown, USA' },
        city: { label: 'City', value: 'Anytown' },
        state: { label: 'State', value: 'Anytown' },
        zipCode: { label: 'ZIP', value: '12345' },
    });


    return (
        <div className="h-fit w-full p-4">
            <ResizablePanelGroup direction="vertical" className="rounded-lg border min-h-[300px]">
                <ResizablePanel defaultSize={100}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Personal Information</h2>
                            <Pen className="w-6 h-6" />
                        </div>

                        <div className="space-y-3">
                            {Object.values(personalInfo).map((item) => (
                                <div key={item.label} className={`flex ${item.label === 'Address' ? 'items-start' : 'items-center'}`}>
                                    <span className="font-semibold text-black w-20">{item.label}:</span>
                                    <span className="text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    );
}