import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import ProtectedRoute from '@/router/ProtectedRoute';
import routes from '@/router/routes';

import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import AuthLayout from '@/layouts/auth-layout/AuthLayout';
import MainLayout from '@/layouts/main-layout/MainLayout';
import Loader from '@/components/loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';

import { loadCategories } from '@/services/categoryServices'
import { checkAuth, selectUser, startLoading } from '@/store/user/userSlice';

function App() {
 
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector(selectUser);

  useEffect(() => {
    // Починаємо завантаження
    dispatch(startLoading());

    // Викликаємо перевірку автентифікації
    dispatch(checkAuth());

    loadCategories(dispatch)
  }, [dispatch]);

  if (loading) {
    return <Loader />
  }

  if (isAuthenticated === null) {
    return <Loader />
  }
  
  return (
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            

            {routes.map((route) =>
              route.path !== '/login' && route.path !== '/signup' ? (
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
