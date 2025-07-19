import { Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../dashboard.css';


export default function TipsView({ stage }: { stage: number }) {
    return (
        <div className="mt-6 space-y-4">
            <Alert
                message="Tips for better results"
                description="Be as detailed as possible with the job description. Include specific technologies, tools, or requirements mentioned in the posting. This helps us create a more targeted application."
                type="success"
                showIcon
                icon={<InfoCircleOutlined />}
                className="!border-green-200  !text-red-500"
            />



            <div className="text-center text-xs text-gray-500 mt-4">
                <p>Your information is secure and will only be used to generate your application materials.</p>
            </div>
        </div>
    )
}