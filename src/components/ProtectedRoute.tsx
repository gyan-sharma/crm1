import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import Dashboard from '../pages/Dashboard';
import Opportunities from '../pages/Opportunities';
import OpportunityDetail from '../pages/OpportunityDetail';
import Offers from '../pages/Offers';
import OfferDetails from '../pages/OfferDetails';
import Pricing from '../pages/Pricing';
import Users from '../pages/Users';
import AuditLog from '../pages/AuditLog';
import Settings from '../pages/Settings';

export default function ProtectedRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="opportunities/:id" element={<OpportunityDetail />} />
        <Route path="offers" element={<Offers />} />
        <Route path="offers/:id" element={<OfferDetails />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="users" element={<Users />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}