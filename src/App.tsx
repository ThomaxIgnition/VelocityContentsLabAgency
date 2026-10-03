import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'motion/react';
import Navbar from './components/shared/Navbar.tsx';
import Footer from './components/shared/Footer.tsx';
import CalAssistant from './components/shared/CalAssistant.tsx';
import HomePage from './pages/HomePage.tsx';

const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'));
const WorkPage = lazy(() => import('./pages/WorkPage.tsx'));
const MethodPage = lazy(() => import('./pages/MethodPage.tsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.tsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
const ChapterPage = lazy(() => import('./pages/ChapterPage.tsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.tsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.tsx'));

const TITLES: Record<string, string> = {
  '/': 'Velocity Contents Lab | Content Strategy, AI Automation & Software',
  '/services': 'Services & Pricing | Velocity Contents Lab',
  '/work': 'Client Work | Velocity Contents Lab',
  '/method': 'How We Work | Velocity Contents Lab',
  '/about': 'About | Velocity Contents Lab',
  '/insights': 'Insights | Velocity Contents Lab',
  '/contact': 'Book a Discovery Call | Velocity Contents Lab'
};

// Scrolls to the top on page change, or to a section when the link carries one (e.g. /services#pricing).
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/'];
    if (hash) {
      const id = hash.slice(1);
      let tries = 0;
      const find = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 20) setTimeout(find, 60);
      };
      setTimeout(find, 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return <div className="min-h-screen bg-ink" />;
}

function MainLayout() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-ink focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />

        <motion.main
          id="main"
          tabIndex={-1}
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex-grow outline-none"
        >
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/method" element={<MethodPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog/:slug" element={<ChapterPage />} />

              {/* Older links kept working */}
              <Route path="/blog" element={<Navigate to="/insights" replace />} />
              <Route path="/resources" element={<Navigate to="/insights" replace />} />
              <Route path="/origin-story" element={<Navigate to="/about" replace />} />

              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </motion.main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <CalAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollManager />
        <MainLayout />
      </Router>
    </MotionConfig>
  );
}
