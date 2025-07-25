"use client"
import React, { useState, useEffect } from 'react';
import { Spin, Progress, Alert } from 'antd';
import { FileTextIcon, CheckCircleIcon, DownloadIcon, MessageSquareIcon, LightbulbIcon } from 'lucide-react';
import '../../../common.css';
import LoadingCard from '../../../../components/cards/loadingCard';

export default function Stage3() {
    const [resumeProgress, setResumeProgress] = useState(0);
    const [coverLetterProgress, setCoverLetterProgress] = useState(0);
    const [interviewNotesProgress, setInterviewNotesProgress] = useState(0);
    const [isGenerating, setIsGenerating] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isGenerating) return;
        const interval = setInterval(() => {
            setResumeProgress(prev => {
                if (prev < 100) return Math.min(prev + Math.random() * 15, 100);
                setCoverLetterProgress(cvPrev => {
                    if (cvPrev < 100) return Math.min(cvPrev + Math.random() * 15, 100);
                    setInterviewNotesProgress(inPrev => {
                        if (inPrev < 100) return Math.min(inPrev + Math.random() * 20, 100);
                        setIsGenerating(false);
                        setIsComplete(true);
                        clearInterval(interval);
                        return 100;
                    });
                    return 100;
                });
                return 100;
            });
        }, 600);
        return () => clearInterval(interval);
    }, [isGenerating]);

    const getOverallProgress = () => {
        return Math.round((resumeProgress + coverLetterProgress + interviewNotesProgress) / 3);
    };

    const getGenerationStatus = () => {
        if (resumeProgress < 100) return "Generating Resume...";
        if (coverLetterProgress < 100) return "Generating Cover Letter...";
        if (interviewNotesProgress < 100) return "Generating Interview Notes...";
        return "All documents ready!";
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl border border-gray-200'>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Generate Your Documents</h2>
                <p className="text-gray-600 text-base">
                    We're creating your tailored resume, cover letter, and interview preparation notes.
                </p>
            </div>

            <div className="space-y-6">
                {/* Overall Progress Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <FileTextIcon className="w-6 h-6 text-green-500" />
                            <span className="text-lg font-medium text-gray-700">Document Generation</span>
                        </div>
                        {isComplete && (
                            <CheckCircleIcon className="w-6 h-6 text-green-500" />
                        )}
                    </div>
                    
                    <Progress 
                        percent={getOverallProgress()} 
                        status={isComplete ? "success" : "active"}
                        strokeColor="#22c55e"
                        className="mb-4"
                    />
                    
                    <div className="text-sm text-gray-600">
                        {isGenerating ? (
                            <div className="flex items-center space-x-2">
                                <Spin size="small" className='ml-2'/>
                                <span className='mr-2'>{getGenerationStatus()}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 text-green-600">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span>All documents generated successfully!</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Individual Document Progress */}
                <div className="space-y-4">
                    <LoadingCard
                        icon={<FileTextIcon className="w-5 h-5 text-blue-500" />}
                        cardName="Resume"
                        progress={resumeProgress}
                        isComplete={resumeProgress >= 100}
                        strokeColor="#3b82f6"
                        statusText={resumeProgress < 100 ? "Optimizing for ATS and tailoring content..." : "Ready for download"}
                    />

                    <LoadingCard
                        icon={<MessageSquareIcon className="w-5 h-5 text-purple-500" />}
                        cardName="Cover Letter"
                        progress={coverLetterProgress}
                        isComplete={coverLetterProgress >= 100}
                        strokeColor="#8b5cf6"
                        statusText={coverLetterProgress < 100 ? "Crafting personalized introduction..." : "Ready for download"}
                    />

                    <LoadingCard
                        icon={<LightbulbIcon className="w-5 h-5 text-orange-500" />}
                        cardName="Interview Notes"
                        progress={interviewNotesProgress}
                        isComplete={interviewNotesProgress >= 100}
                        strokeColor="#f97316"
                        statusText={interviewNotesProgress < 100 ? "Preparing questions and key talking points..." : "Ready for download"}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-5">
                    {isComplete ? (
                        <>
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2">
                                <DownloadIcon className="w-5 h-5" />
                                <span>Download All</span>
                            </button>
                        </>
                    ) : (
                        <div className="w-full text-center text-gray-500">
                            Please wait while we generate your documents...
                        </div>
                    )}
                </div>

                

                
            </div>
        </div>
    );
}