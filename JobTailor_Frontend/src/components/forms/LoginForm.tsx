import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { routes } from "@/constants/routes";
import "../../app/common.css";
import { get_user_by_username, login } from "@/api";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Divider } from "antd";
import { signin, signinWithGoogle } from "@/auth/signin";

export default function LoginForm() {
  const { setUser } = useUser();
  const router = useRouter();
  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      
      const signinResponse = await signin(values.email!, values.password!);
      console.log(signinResponse);

    

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    // Handle form validation errors
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
          rules={[{ required: true, message: "Please input your password!" }]}
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full custom_button"
            style={{ borderRadius: "30px" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Divider>or</Divider>

<Button
    type="default"
    size="large"
    className="w-full mb-4"
    onClick={handleGoogleSignIn}
    icon={
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    }
>
    Sign up with Google
</Button>
      <p className="text-sm text-gray-500 text-center mt-4">
        Don't have an account?{" "}
        <Link href={routes.signup} className="custom_link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
