"use client"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../../../common.css';
import TipsView from './tipsView';

export default function Stage2() {
    type FieldType = {
        extraContext?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl border border-gray-200'>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Additional Context</h2>
                <p className="text-gray-600 text-base">
                    Provide any additional context or specific requirements that will help us create a more targeted application.
                </p>
            </div>

            <Form
                name="stage2Form"
                labelCol={{ span: 24 }}
                labelAlign="left"
                layout="vertical"
                wrapperCol={{ span: 24 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="w-full"
            >
                <Form.Item<FieldType>
                    label={<span className="text-gray-700 font-medium">Extra Context</span>}
                    name="extraContext"
                    rules={[{ required: true, message: 'Please input your extra context!' }]}
                >
                    <Input.TextArea
                        size="large"
                        placeholder="Share any additional information, specific requirements, or context that might be relevant for this application..."
                        rows={8}
                        className="rounded-lg border-gray-300 focus:!border-green-500 focus:!ring-green-500 resize-none"
                        style={{ minHeight: '200px' }}
                    />
                </Form.Item>

                <Form.Item className="mb-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        ghost={false}
                        danger={false}
                        loading={false}
                        disabled={false}
                        block={true}
                        shape="round"
                        icon={<ArrowRightOutlined />}
                        className="custom_button"
                        style={{
                            background: '#22c55e',
                            border: 'none',
                            height: '48px',
                            fontSize: '16px',
                            fontWeight: '600',
                            boxShadow: '0 4px 6px rgba(34, 197, 94, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Continue to Next Step
                    </Button>
                </Form.Item>

                {/* Note and Context Section */}
                <TipsView stage={2} />
            </Form>
        </div>
    );
}