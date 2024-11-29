import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import ProtectedRoute from '@/router/ProtectedRoute';
import routes from '@/router/routes';

import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import AuthLayout from '@/layouts/auth-layout/AuthLayout';
import MainLayout from '@/layouts/main-layout/MainLayout';
import Loader from '@/components/loader/Loader';

function App() {
  const isAuthenticated = true;
  
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          

          {routes.map((route) =>
            route.path === '/' ? (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <MainLayout>
                      {route.element}
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            ) : (
              <Route key={route.path} path={route.path} element={route.element} />
            )
          )}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
