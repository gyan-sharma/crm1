import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Target, LogOut, ClipboardList, Settings as SettingsIcon, DollarSign, FileText } from 'lucide-react';
import { Toaster } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/opportunities', icon: Target, label: 'Opportunities' },
  { to: '/offers', icon: FileText, label: 'Offers' },
  { to: '/pricing', icon: DollarSign, label: 'Pricing' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/audit-log', icon: ClipboardList, label: 'Audit Log' },
  { to: '/settings', icon: SettingsIcon, label: 'Settings' }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Sales CRM</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <nav className="mt-5 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md mb-1
                    ${isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}