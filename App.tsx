
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import { CartProvider } from './context/CartContext';
import { BottomNav } from './components/BottomNav';

// Pages
import { Splash } from './pages/Splash';
import { Login } from './pages/Login';
import { RegisterType } from './pages/RegisterType';
import { RegisterBasic } from './pages/RegisterBasic';
import { RegisterProviderComplete } from './pages/RegisterProviderComplete';
import { Dashboard } from './pages/Dashboard';
import { ProviderProfile } from './pages/ProviderProfile';
import { ProviderDashboard } from './pages/ProviderDashboard'; 
import { ProviderOfferForm } from './pages/ProviderOfferForm';
import { ProviderSchedule } from './pages/ProviderSchedule';
import { ProviderOrders } from './pages/ProviderOrders'; 
import { ProviderStore } from './pages/ProviderStore';
import { BookingPage } from './pages/BookingPage';
import { DesapegoFeed } from './pages/DesapegoFeed';
import { DesapegoForm } from './pages/DesapegoForm';
import { CategoryFeed } from './pages/CategoryFeed';
import { PlaceholderPage } from './pages/PlaceholderPage';

// Component to handle forced redirect logic
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // FORCE REDIRECT TO SPLASH ON LOAD/RELOAD
    // This ensures the user always starts at the beginning for the demo flow
    // We check if we are already at root to avoid infinite loops if Splash redirects elsewhere
    if (location.pathname !== '/' && !sessionStorage.getItem('app_loaded')) {
      sessionStorage.setItem('app_loaded', 'true');
      navigate('/');
    }
  }, []);

  return (
    <>
      {/* pb-[100px] ensures content isn't hidden behind the floating nav */}
      <div className="font-sans antialiased text-slate-800 min-h-screen bg-[#f8fafc] pb-[100px] relative viewport-fit-cover">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard handles both Resident and Provider logic */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          
          {/* Resident Flow - Booking */}
          <Route path="/booking/:providerId/:serviceId" element={<BookingPage />} />
          
          {/* Provider Specific Routes */}
          <Route path="/provider/store" element={<ProviderStore />} />
          <Route path="/provider/offer/new" element={<ProviderOfferForm />} />
          <Route path="/provider/offer/edit/:id" element={<ProviderOfferForm />} />
          <Route path="/provider/schedule" element={<ProviderSchedule />} />
          <Route path="/provider/orders" element={<ProviderOrders />} />
          
          {/* Category Feeds */}
          <Route path="/category/:type" element={<CategoryFeed />} />
          
          {/* Desapego Routes */}
          <Route path="/desapego" element={<DesapegoFeed />} />
          <Route path="/desapego/new" element={<DesapegoForm />} />
          <Route path="/desapego/edit/:id" element={<DesapegoForm />} />
          
          {/* Registration Flow */}
          <Route path="/register/type" element={<RegisterType />} />
          <Route path="/register/basic" element={<RegisterBasic />} />
          <Route path="/register/provider-complete" element={<RegisterProviderComplete />} />
          
          {/* Placeholder Routes for BottomNav */}
          <Route path="/search" element={<PlaceholderPage title="Busca" icon="🔍" />} />
          <Route path="/orders" element={<PlaceholderPage title="Pedidos" icon="📦" />} />
          <Route path="/profile" element={<PlaceholderPage title="Perfil" icon="👤" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <BottomNav />
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Clear session storage on hard refresh to allow splash redirect again
  window.onbeforeunload = () => {
    sessionStorage.removeItem('app_loaded');
  };

  return (
    <HashRouter>
      <RegistrationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </RegistrationProvider>
    </HashRouter>
  );
};

export default App;
