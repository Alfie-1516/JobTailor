"use client"
import React, { useState, useEffect} from 'react';
import { Steps } from 'antd';
import './dashboard.css';
import Content from './dashboard_components/content';

const description = 'This is a description.';

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(0);
    return (
    <div className="w-full h-full flex">
        
        <div className='w-[20rem] pt-20'>
        <Steps
                className=' h-full'
            direction="vertical"
            current={currentPage}
            items={[
                {
                    title: 'Paste your Job Description',
                    description,
                },
                {
                    title: 'Confirm your Experience',
                    description,
                },
                {
                    title: 'Generating your Files',
                    description,
                },
                {
                    title: 'Completed',
                    description,
                }
            ]}
        /></div>
        <div className=" flex-1  "> <Content setCurrentPage={setCurrentPage} /></div>
           
    </div>
);
}