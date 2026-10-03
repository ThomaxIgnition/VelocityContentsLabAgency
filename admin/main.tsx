import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp.tsx';
import '../src/index.css';

// The private admin site: built and hosted separately from the public website.
// Sign-in and data access are enforced by Supabase (row-level security).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>
);
