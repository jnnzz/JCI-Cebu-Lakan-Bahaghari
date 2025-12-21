import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import Loading from './components/Loading';
import { PublicLayout } from './components/Layout/PublicLayout';
import { AdminLayout } from './components/Layout/AdminLayout';

// Public Pages (Eager loading for fast initial load)
import JCI from './pages/JCI';
import JCI2 from './pages/JCI2';
import Book from './pages/Book';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin Pages (Lazy loading - loaded only when needed)
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Admin2 = lazy(() => import('./pages/Admin2'));
const Admin3 = lazy(() => import('./pages/Admin3'));
const Member = lazy(() => import('./pages/Member'));
const TestApiPage = lazy(() => import('./pages/TestApiPage').then(module => ({ default: module.TestApiPage })));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Navigate to="/jci" replace />} />
                <Route path="/jci" element={<JCI />} />
                <Route path="/jci2" element={<JCI2 />} />
                <Route path="/book" element={<Book />} />
              </Route>

              {/* Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin2" element={<Admin2 />} />
                <Route path="/admin3" element={<Admin3 />} />
                <Route path="/member" element={<Member />} />
                <Route path="/test-api" element={<TestApiPage />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;