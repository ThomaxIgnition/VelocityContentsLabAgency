/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar.tsx';
import Footer from './components/shared/Footer.tsx';
import StickyCTA from './components/shared/StickyCTA.tsx';

// Pages
import LandingPage from './pages/LandingPage.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ChapterPage from './pages/ChapterPage.tsx';
import ResourcesPage from './pages/ResourcesPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import OriginStoryPage from './pages/OriginStoryPage.tsx';
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

// Global layout wrapper to conditonally omit default headers on admin control boards
function MainLayout() {
  const location = useLocation();
  const path = location.pathname;
  
  const isAdminPath = path.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdminPath && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ChapterPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/origin-story" element={<OriginStoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <StickyCTA />}
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
