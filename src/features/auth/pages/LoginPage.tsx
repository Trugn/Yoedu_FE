import { Button, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import InputCustom from '@/shared/components/input/InputCustom';
import InputPasswordCustom from '@/shared/components/input/InputPasswordCustom';
import { useNotification } from '@/shared/hooks/useNotification';
import { loginThunk } from '@/features/auth/store/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import yoeduLogo from '@/assets/images/yoedu-logo.svg';
import type { LoginPayload } from '../types/auth-type';
const { Link } = Typography;

interface LoginFormValues {
    email: string;
    password: string;
}

function LoginPage() {
    const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const [form] = Form.useForm<LoginPayload>();


    const onFinish = async (values: LoginFormValues) => {
        try {
            await dispatch(
                loginThunk({
                    email: values.email,
                    password: values.password,
                })
            ).unwrap();

            showNotification(
                'success',
                'Đăng nhập thành công',
                'Bạn đã đăng nhập thành công. Vui lòng tiếp tục sử dụng hệ thống.'
            );

            navigate('/', { replace: true });
        } catch (error: any) {
            showNotification(
                'error',
                'Đăng nhập thất bại',
                error || 'Đã xảy ra lỗi. Vui lòng thử lại.'
            );
        }
    };
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <img src={yoeduLogo} alt="Logo" className="mx-auto h-12 w-auto" />
                <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>
                <h6 className="text-lg text-gray-600 text-center">
                    Nhập thông tin tài khoản để tiếp tục
                </h6>
                <Form form={form} onFinish={onFinish} layout="vertical">
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

                    <Link className="text-blue-500 flex justify-end mt-4" href="/auth/login">
                        Quên mật khẩu?
                    </Link>

                    <Button type="primary" htmlType="submit" className="w-full mt-6">
                        Đăng nhập
                    </Button>

                    <p className="text-center text-gray-600 mt-6">
                        Chưa có tài khoản?{' '}
                        <Link className="text-blue-500" href="/auth/register">
                            Đăng ký tại đây
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
