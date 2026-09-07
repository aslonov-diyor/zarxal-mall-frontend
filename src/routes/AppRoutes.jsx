import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import PerfumeDetail from '../pages/PerfumeDetail';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import AdminAddPerfume from '../pages/AdminAddPerfume';
import AdminPerfumes from '../pages/AdminPerfumes';
import AdminEditPerfume from '../pages/AdminEditPerfume';
import AdminBrands from '../pages/AdminBrands';
import AdminCustomers from '../pages/AdminCustomers';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import PageTransition from '../components/PageTransition';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/perfume/:id" element={<PageTransition><PerfumeDetail /></PageTransition>} />

        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/perfumes"
          element={
            <ProtectedRoute>
              <PageTransition><AdminPerfumes /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/perfumes/new"
          element={
            <ProtectedRoute>
              <PageTransition><AdminAddPerfume /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/perfumes/:id/edit"
          element={
            <ProtectedRoute>
              <PageTransition><AdminEditPerfume /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/brands"
          element={
            <ProtectedRoute>
              <PageTransition><AdminBrands /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <PageTransition><AdminCustomers /></PageTransition>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
