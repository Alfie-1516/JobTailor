import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import '../../app/common.css';
import { create_user_details, signup, get_user_by_username } from '@/api';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function SignupForm() {
    const router = useRouter();
    const { setUser } = useUser();
    
    type FieldType = {
        firstName?: string;
        lastName?: string;
        username?: string;
        password?: string;
        reenterPassword?: string;
        email?: string;
        agree?: boolean;
    };
    
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const data = {
                firstName: values.firstName!,
                lastName: values.lastName!,
                username: values.username!,
                email: values.email!,
                password: values.password!,
            };
            
            // Create user account
            const signupResponse = await signup(data);
            // Create user details profile
            await create_user_details(
                signupResponse.data._id, 
                data.firstName, 
                data.lastName, 
                data.email
            );
            
            // Get the complete user data and set in context
            const userData = await get_user_by_username(data.username);
            setUser(userData);
            
            // Navigate to dashboard
            router.push(routes.dashboard);
            
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        // Handle form validation errors
    };
    return (
        <div className="bg-white rounded-xl border-1 border-gray-300 shadow-xl shadow-gray-300 p-8 w-96">
            <Form
                className="w-full"
                name="signup"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ agree: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                <Form.Item<FieldType>
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Enter your first name"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Enter your last name"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Enter your username"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Enter your email"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Enter password"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Re-enter Password"
                    name="reenterPassword"
                    rules={[
                        { required: true, message: 'Please re-enter your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Re-enter password"
                        className="bg-gray-50 placeholder:text-sm placeholder:text-gray-500 focus:bg-white focus:border-blue-500"
                    />
                </Form.Item>

                <Form.Item<FieldType> name="agree" valuePropName="checked">
                    <Checkbox>I agree to the terms and conditions</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="w-full custom_button" >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Already have an account? <Link href={routes.login} className="custom_link">Login</Link>
            </p>
        </div>
    )
}