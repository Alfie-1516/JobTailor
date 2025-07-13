"use client"
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Card from '@/components/cards/card';

export default function Details() {
    const [personalInfo, setPersonalInfo] = useState([
        {
            id: 1,
            name: { label: 'Name', value: 'Alok Kumar' },
            email: { label: 'Email', value: 'alokkumar@gmail.com' },
            phone: { label: 'Phone', value: '9876543210' },
            address: { label: 'Address', value: '123, Main Street, Anytown, USA' },
            city: { label: 'City', value: 'Anytown' },
            state: { label: 'State', value: 'Anytown' },
            zipCode: { label: 'ZIP', value: '12345' },
        }
    ]);

    const [jobExperience, setJobExperience] = useState([
        {
            id: 1,
            jobTitle: { label: 'Job Title', value: 'Senior Software Engineer' },
            company: { label: 'Company', value: 'Tech Solutions Inc.' },
            location: { label: 'Location', value: 'San Francisco, CA' },
            startDate: { label: 'Start Date', value: 'January 2022' },
            endDate: { label: 'End Date', value: 'Present' },
            description: { label: 'Description', value: 'Led development of scalable web applications using React and Node.js. Managed team of 5 developers and implemented CI/CD pipelines.' }
        },
        {
            id: 2,
            jobTitle: { label: 'Job Title', value: 'Full Stack Developer' },
            company: { label: 'Company', value: 'Digital Innovations LLC' },
            location: { label: 'Location', value: 'New York, NY' },
            startDate: { label: 'Start Date', value: 'March 2020' },
            endDate: { label: 'End Date', value: 'December 2021' },
            description: { label: 'Description', value: 'Developed and maintained multiple client websites. Worked with technologies including JavaScript, Python, and AWS.' }
        }
    ]);

    return (
        <div className="h-full w-1/2 ">
            <ScrollArea className="rounded-lg border h-full p-4 ">
                <Card information={personalInfo} title="Personal Information" />
                <Card information={jobExperience} title="Work Experience" />
            </ScrollArea>
        </div>
    );
}