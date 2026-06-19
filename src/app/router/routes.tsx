import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';

import AuthLayout from '../layouts/AuthLayout';

import MainLayout from '@/app/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
//import StudentPage from '@/features/students/pages/StudentPage';
//import UserProfilePage from '@/features/users/pages/UserProfilePage';
//import TeacherPage from '@/features/teachers/pages/TeacherPage';
//import CoursePage from '@/features/courses/pages/CoursePage';
//import DashboardPage from '@/features/dashboard/pages/Dashboard';
//import EnrollmentPage from '@/features/enrollments/pages/EnrollmentPage';

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
                                //element: <StudentPage />,
                            },
                            {
                                path: 'teachers',
                                //element: <TeacherPage />,
                            },
                            {
                                path: 'courses',
                                //element: <CoursePage />,
                            },
                            {
                                path: 'enrollments',
                                //  element: <EnrollmentPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
