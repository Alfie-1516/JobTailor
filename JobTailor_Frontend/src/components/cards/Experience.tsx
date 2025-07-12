"use client"
import { useState } from 'react';
import { Pen } from 'lucide-react';
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Experience() {
    const [experiences, setExperiences] = useState([
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
        <div className=" w-full p-4">
            <ResizablePanelGroup direction="vertical" className="rounded-lg border min-h-[300px] h-full">
                <ResizablePanel className='h-full'>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Work Experience</h2>
                            <Pen className="w-6 h-6" />
                        </div>

                        <div className="space-y-6">
                            {experiences.map((experience, index) => (
                                <div key={experience.id} className="border-l-4 border-green-500 pl-4 pb-4">
                                    <div className="space-y-2">
                                        {Object.values(experience).filter(item => typeof item === 'object' && 'label' in item).map((item: any) => (
                                            <div key={item.label} className={`flex ${item.label === 'Description' ? 'items-start' : 'items-center'}`}>
                                                <span className="font-semibold text-black w-24">{item.label}:</span>
                                                <span className="text-gray-900 flex-1">{item.value || 'Not specified'}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {index < experiences.length - 1 && <hr className="mt-4" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}