"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Alert } from "antd";
import { InfoCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "../../../common.css";
import TipsView from "./tipsView";
import "../dashboard.css";

type FieldType = {
  companyName?: string;
  jobDescription?: string;
};

export default function Stage1({
  onNext,
  onDataSubmit,
}: {
  onNext?: () => void;
  onDataSubmit?: (data: FieldType) => void;
}) {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Stage1 form submitted:", values);
    // Pass data to parent component
    if (onDataSubmit) {
      onDataSubmit(values);
    }
    // Handle form submission
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 100); // Small delay to ensure form submission is complete
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    // Handle form errors
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Job Information
        </h2>
        <p className="text-gray-600 text-base">
          Start by providing the basic job details. This information will help
          us tailor your application.
        </p>
      </div>

      <Form
        name="jobForm"
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
          label={
            <span className="text-gray-700 font-medium">Company Name</span>
          }
          name="companyName"
          rules={[
            { required: true, message: "Please input your company name!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter the company name you're applying to"
            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span className="text-gray-700 font-medium">Job Description</span>
          }
          name="jobDescription"
          rules={[
            { required: true, message: "Please input your job description!" },
          ]}
        >
          <Input.TextArea
            size="large"
            placeholder="Paste the job description here. Include key responsibilities, requirements, and any specific details about the role..."
            rows={8}
            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
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
              background: "#22c55e",
              border: "none",
              height: "48px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(34, 197, 94, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Continue to Job Preferences
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
