/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar.tsx';
import Footer from './components/shared/Footer.tsx';
import StickyCTA from './components/shared/StickyCTA.tsx';
import CalAssistant from './components/shared/CalAssistant.tsx';

// Flagship Architecture Pages
import HomePage from './pages/HomePage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import WorkPage from './pages/WorkPage.tsx';
import MethodPage from './pages/MethodPage.tsx';
import InsightsPage from './pages/InsightsPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ChapterPage from './pages/ChapterPage.tsx';
import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';

// Scroll coordinator helper to guarantee clean editorial resets on route transitions
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Global layout wrapper to conditionally omit default headers on admin control boards
function MainLayout() {
  const location = useLocation();
  const path = location.pathname;
  
  const isAdminPath = path.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-editorial-cream text-[#1A1A1A]">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Primary Flagship Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/method" element={<MethodPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Ebook Chapter Deep-Dives */}
          <Route path="/blog/:slug" element={<ChapterPage />} />

          {/* Backward compatibility aliases */}
          <Route path="/blog" element={<Navigate to="/insights" replace />} />
          <Route path="/resources" element={<Navigate to="/insights" replace />} />
          <Route path="/origin-story" element={<Navigate to="/about" replace />} />

          {/* Secure Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <StickyCTA />}
      {!isAdminPath && <CalAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}
