import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';

import AuthLayout from '../layouts/AuthLayout';

import MainLayout from '@/app/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
//import UserProfilePage from '@/features/users/pages/UserProfilePage';
import TeacherPage from '@/features/teachers/pages/TeacherPage';
import CoursePage from '@/features/courses/pages/CoursePage';
//import DashboardPage from '@/features/dashboard/pages/Dashboard';
import EnrollmentPage from '@/features/enrollments/pages/EnrollmentPage';
import UserPage from '@/features/users/pages/UserPage';
import StudentPage from '@/features/students/pages/StudentPage';
import ParentPage from '@/features/parents/pages/ParentPage';
import RoomPage from '@/features/rooms/pages/RoomPage';
import SchedulePage from '@/features/schedules/pages/SchedulesPage';
import CourseClassPage from '@/features/course-class/pages/CourseClassPage';
import CourseClassSessionPage from '@/features/course-class-session/pages/CourseClassSessionPage';
import CourseClassCalendarPage from '@/features/course-class-session/pages/CourseClassCalendarPage';
import LeaveRequestPage from '@/features/leave-request/pages/LeaveRequestPage';
import TuitionInvoicePage from '@/features/tuition-invoice/pages/TuitionInvoicePage';
import PromotionPage from '@/features/promotion/pages/PromotionPage';
import PaymentPage from '@/features/payment/pages/PaymentPage';
export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            /******************** AUTH *********************/
            {
                element: <ProtectedRoute requireAuth={false} />,
                children: [
                    {
                        path: '/auth',
                        element: <AuthLayout />,
                        children: [
                            {
                                path: 'login',
                                element: <LoginPage />,
                            },
                            {
                                path: 'register',
                                element: <RegisterPage />,
                            },
                        ],
                    },
                ],
            },

            /******************** MAIN *********************/
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/',
                        element: <MainLayout />,
                        children: [
                            {
                                index: true,
                                element: (
                                    <div className="p-8">
                                        <h1 className="text-3xl font-bold">Trang chủ</h1>
                                    </div>
                                ),
                                //element: <DashboardPage />,
                            },
                            {
                                path: 'profile',
                                //element: <UserProfilePage />,
                            },
                            {
                                path: 'students',
                                element: <StudentPage />,
                            },
                            {
                                path: 'teachers',
                                element: <TeacherPage />,
                            },
                            {
                                path: 'parents',
                                element: <ParentPage />,
                            },
                            {
                                path: 'accounts',
                                element: <UserPage />,
                            },
                            {
                                path: 'courses',
                                element: <CoursePage />,
                            },
                            {
                                path: 'enrollments',
                                element: <EnrollmentPage />,
                            },
                            {
                                path: 'rooms',
                                element: <RoomPage />,
                            },
                            {
                                path: 'schedules',
                                element: <SchedulePage />,
                            },
                            {
                                path: 'course-classes',
                                element: <CourseClassPage />,
                            },
                            {
                                path: 'course-class-sessions',
                                element: <CourseClassSessionPage />,
                            },
                            {
                                path: 'calendar',
                                element: <CourseClassCalendarPage />,
                            },
                            {
                                path:'leave-requests',
                                element: <LeaveRequestPage />,
                            },
                            {
                                path: 'tuition-invoices',
                                element: <TuitionInvoicePage />,
                            },
                            {
                                path:'promotions',
                                element: <PromotionPage />
                            },
                            {
                                path:'payments',
                                element: <PaymentPage />
                            }

                        ],
                    },
                ],
            },
        ],
    },
]);
