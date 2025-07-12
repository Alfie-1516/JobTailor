import React from 'react';
import { Steps } from 'antd';

const description = 'This is a description.';

const Dashboard: React.FC = () => (
    <>
        <style>
            {`
                .ant-steps-item-process .ant-steps-item-icon {
                    background-color: #22c55e !important;
                    border-color: #22c55e !important;
                }
                .ant-steps-item-finish .ant-steps-item-icon {
                    background-color: #22c55e !important;
                    border-color: #22c55e !important;
                }
                .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon {
                    color: white !important;
                }
                .ant-steps-item-finish .ant-steps-item-tail::after {
                    background-color: #22c55e !important;
                }
                .ant-steps-item-process .ant-steps-item-tail::after {
                    background-color: #22c55e !important;
                }
            `}
        </style>
        <Steps
            direction="vertical"
            current={2}
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
                    title: 'Generating your Resume',
                    description,
                },
                {
                    title: 'Generating your Cover Letter',
                    description,
                },
                {
                    title: 'Generating your Interview Notes',
                    description,
                },
            ]}
        />
    </>
);

export default Dashboard;