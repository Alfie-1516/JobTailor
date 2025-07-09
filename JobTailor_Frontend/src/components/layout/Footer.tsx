"use client";
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
export default function CustomFooter() {
    return (
        <footer
            className="px-20 fixed bottom-0 w-full bg-gray-50 border-t border-gray-200 z-50 py-1 text-xs text-black"
        >
            Job Tailor ©{new Date().getFullYear()} - Your Personalized Job Search Platform
        </footer>
    );
}