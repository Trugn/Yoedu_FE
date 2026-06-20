import { Image, Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined,
    TeamOutlined,
    SolutionOutlined,
    UserOutlined,
    BookOutlined,
    AuditOutlined,
    ReadOutlined,
    WalletOutlined,
    ScheduleOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import YoeduLogo from '@/assets/images/yoedu-logo.svg';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useAppSelector } from '@/app/redux/hooks';

const { Sider } = Layout;

interface AppSidebarProps {
    collapsed: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
    const { user } = useAppSelector((state) => state.auth);
    const { theme } = useTheme();
    console.log('User in AppSidebar:', user);
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'user-management',
            label: 'Quản lý người dùng',
            icon: <TeamOutlined />,
            //roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF], // Chỉ admin và manager mới thấy menu này
            children: [
                {
                    key: '/accounts',
                    icon: <AuditOutlined />,
                    label: 'Tài khoản',
                },
                {
                    key: '/students',
                    icon: <UserOutlined />,
                    label: 'Học viên',
                },
                {
                    key: '/parents',
                    icon: <TeamOutlined />,
                    label: 'Phụ huynh',
                },
                {
                    key: '/teachers',
                    icon: <SolutionOutlined />,
                    label: 'Giáo viên',
                },
            ],
        },
        {
            key: 'academic-management',
            label: 'Quản lý đào tạo',
            icon: <BookOutlined />,
            children: [
                {
                    key: '/rooms',
                    icon: <SolutionOutlined />,
                    label: 'Phòng học',
                },
                {
                    key: '/schedules',
                    icon: <ScheduleOutlined />,
                    label: 'Ca học',
                },
                {
                    key: '/courses',
                    icon: <ReadOutlined />,
                    label: 'Khóa đào tạo',
                },
                {
                    key: '/course-classes',
                    icon: <ReadOutlined />,
                    label: 'Lớp học',
                },
                {
                    key: '/enrollments',
                    icon: <SolutionOutlined />,
                    label: 'Tuyển sinh',
                },
                {
                    key: '/course-class-sessions',
                    icon: <CalendarOutlined />,
                    label: 'Lịch học',
                },
                {
                    key: '/calendar',
                    icon: <CalendarOutlined />,
                    label: 'Calendars',
                },
                {
                    key: '/leave-requests',
                    icon: <AuditOutlined />,
                    label: 'Đơn xin nghỉ',
                },
            ],
        },
        {
            key: 'finance',
            label: 'Quản lý học phí',
            icon: <WalletOutlined />,
            //roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF], // Chỉ admin và manager mới thấy menu này
            children: [
                {
                    key: '/tuition-invoices',
                    icon: <WalletOutlined />,
                    label: 'Hóa đơn học phí',
                },
                {
                    key: '/payments',
                    icon: <WalletOutlined />,
                    label: 'Thanh toán',
                },
                {
                    key: '/promotions',
                    icon: <WalletOutlined />,
                    label: 'Chương trình khuyến mãi',
                },
            ],
        },
    ];

    return (
        <Sider width={240} collapsed={collapsed}>
            <div
                className={`h-16 flex items-center justify-center border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
            >
                <Image src={YoeduLogo} preview={false} width={collapsed ? 48 : 64} />
            </div>

            <Menu
                theme={theme}
                mode="inline"
                items={items}
                selectedKeys={[location.pathname]}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
};

export default AppSidebar;
