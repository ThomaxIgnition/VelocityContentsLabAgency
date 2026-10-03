import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './AdminDashboard.tsx';
import '../src/index.css';

// The private admin site. It is built and hosted separately from the public
// website, behind Cloudflare Access, so none of this code ships to visitors.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>
);
