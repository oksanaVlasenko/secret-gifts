import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Ліниве завантаження сторінок
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'))
const MyProfile = lazy(() => import('@/pages/MyProfile'))

const routes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/', element: <Home /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/profile', element: <MyProfile /> },
];

export default routes;
