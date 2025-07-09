"use client";
import React from 'react';
import { Layout } from 'antd';
import LoginForm from '@/components/forms/LoginForm';

export default function Login() {
    const { Content } = Layout;
 
    return (
        <Content className="flex justify-center items-center h-full ">
            <LoginForm />
        </Content>
    )
}