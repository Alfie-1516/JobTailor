import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { routes } from '@/constants/routes';

export default function LoginForm() {
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="bg-white rounded-xl border-1 border-gray-300 shadow-xl shadow-gray-300 p-8 w-96">
            <Form
                className="w-full"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ message: 'Please input your username!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Enter your username"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ message: 'Please input your password!' }]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Enter password"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="w-full" style={{ borderRadius: '30px' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Don't have an account? <Link href={routes.signup} className="text-blue-600 hover:text-blue-800 hover:underline">Sign up</Link>
            </p>
        </div>
    )
}