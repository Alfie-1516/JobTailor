"use client";
import React from 'react';
import { Layout } from 'antd';
import SignupForm from '@/components/forms/SignupForm';

export default function Signup() {
    const { Content } = Layout;

    return (
        <Content className="flex justify-center items-center h-full ">
            <SignupForm />
        </Content>
    )
}