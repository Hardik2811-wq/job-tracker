import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MdDashboard,
  MdWork,
  MdAddBox,
  MdBarChart,
  MdBookmark,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { motion } from 'framer-motion';
import { useApplications } from '../../hooks/useApplications';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/dashboard', icon: MdDashboard, label: 'Dashboard' },
  { to: '/applications', icon: MdWork, label: 'Applications' },
  { to: '/applications/new', icon: MdAddBox, label: 'Add Job' },
  { to: '/analytics', icon: MdBarChart, label: 'Analytics' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { bookmarked, stats } = useApplications();
  const { theme, toggleTheme } = useTheme();

  // Close mobile nav on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="mobile-topbar">
        <div className="mobile-brand">
          <MdWork size={18} />
          <span>JobTracker</span>
        </div>
        <div className="topbar-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
          </button>
          <button className="icon-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <MdClose size={20} /> : <MdMenu size={20} />}
          </button>
        </div>
      </div>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <MdWork size={22} />
          </div>
          <div>
            <div className="logo-title">JobTracker</div>
            <div className="logo-subtitle">Smart Dashboard</div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={20} />
                  <span>{label}</span>
                  {label === 'Applications' && stats.total > 0 && (
                    <span className="nav-badge">{stats.total}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-stat">
            <MdBookmark size={16} color="var(--warning)" />
            <span>{bookmarked.length} bookmarked</span>
          </div>
          <div className="sidebar-stat">
            <span className="dot success" />
            <span>{stats.offers} offers</span>
          </div>
        </div>
      </aside>
    </>
  );
}
