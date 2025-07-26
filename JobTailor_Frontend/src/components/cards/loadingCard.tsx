import React from 'react';
import { Progress } from 'antd';
import { CheckCircleIcon } from 'lucide-react';

interface LoadingCardProps {
    icon: React.ReactNode;
    cardName: string;
    progress: number;
    isComplete: boolean;
    strokeColor: string;
    statusText: string;
}

export default function LoadingCard({ 
    icon, 
    cardName, 
    progress, 
    isComplete, 
    strokeColor, 
    statusText 
}: LoadingCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    {icon}
                    <span className="font-medium text-gray-700">{cardName}</span>
                </div>
                {isComplete && (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                )}
            </div>
            <Progress 
                percent={Math.round(progress)} 
                status={isComplete ? "success" : "active"}
                strokeColor={strokeColor}
                size="small"
            />
            <div className="text-xs text-gray-500 mt-1">
                {statusText}
            </div>
        </div>
    );
}
