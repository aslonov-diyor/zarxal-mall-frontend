import { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import CustomerFormModal from './components/CustomerFormModal';
import CursorGlow from './components/CursorGlow';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const CUSTOMER_SEEN_KEY = 'zarxal_customer_prompted';

// Foydalanuvchi (admin bo'lmagan) sahifalarda birinchi tashrifda ism/telefon so'raladi.
// Login talab qilinmaydi — bu shunchaki ixtiyoriy ma'lumot yig'ish.
function CustomerPrompt() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith('/admin');
    const alreadyPrompted = localStorage.getItem(CUSTOMER_SEEN_KEY);

    if (!isAdminRoute && !alreadyPrompted) {
      const timer = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    localStorage.setItem(CUSTOMER_SEEN_KEY, '1');
    setOpen(false);
  };

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <CustomerFormModal
      open={open}
      onClose={handleClose}
      onSuccess={handleClose}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="grain-layer" />
          <div className="vignette-layer" />
          <CursorGlow />
          <AppRoutes />
          <CustomerPrompt />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#17160F',
                color: '#F6F3EA',
                border: '1px solid #2A2818',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#B7965B', secondary: '#17160F' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
