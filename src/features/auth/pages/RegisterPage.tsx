import { Button, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import InputCustom from '@/shared/components/input/InputCustom';
import InputPasswordCustom from '@/shared/components/input/InputPasswordCustom';
import { useNotification } from '@/shared/hooks/useNotification';
import yoeduLogo from '@/assets/images/yoedu-logo.svg';

const { Link } = Typography;

interface RegisterFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function RegisterPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const onFinish = async (values: RegisterFormValues) => {
        try {
            console.log('Form values:', values);
            // TODO: Gọi API register
            showNotification('success', 'Đăng ký tài khoản thành công');
            navigate('/auth/login');
        } catch {
            showNotification('error', 'Lỗi đăng ký tài khoản');
        }
    };
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <img src={yoeduLogo} alt="Logo" className="mx-auto h-12 w-auto" />
                <h2 className="text-2xl font-bold text-center">Đăng ký</h2>
                <h6 className="text-lg text-gray-600 text-center">Tạo tài khoản mới để tiếp tục</h6>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <InputCustom placeholder="Nguyễn Văn A" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <InputCustom placeholder="admin@gmail.com" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <InputPasswordCustom placeholder="••••••••" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                },
                            }),
                        ]}
                    >
                        <InputPasswordCustom placeholder="••••••••" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="w-full mt-6">
                        Đăng ký
                    </Button>

                    <p className="text-center text-gray-600 mt-6">
                        Đã có tài khoản?{' '}
                        <Link className="text-blue-500" href="/auth/login">
                            Đăng nhập tại đây
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;
