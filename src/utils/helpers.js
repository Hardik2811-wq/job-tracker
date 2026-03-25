import { format, parseISO, isValid } from 'date-fns';

export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const date = parseISO(dateStr);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : '—';
  } catch {
    return '—';
  }
};

export const getStatusColor = (status) => {
  const map = {
    Applied: '#6366f1',
    Interviewing: '#f59e0b',
    Offer: '#10b981',
    Rejected: '#ef4444',
  };
  return map[status] || '#94a3b8';
};

export const getStatusBg = (status) => {
  const map = {
    Applied: 'rgba(99,102,241,0.15)',
    Interviewing: 'rgba(245,158,11,0.15)',
    Offer: 'rgba(16,185,129,0.15)',
    Rejected: 'rgba(239,68,68,0.15)',
  };
  return map[status] || 'rgba(148,163,184,0.15)';
};

export const salaryDisplay = (salary) => {
  if (!salary) return 'Not specified';
  return `₹${(salary / 100000).toFixed(1)}L/yr`;
};

export const groupByMonth = (applications) => {
  const months = {};
  applications.forEach((app) => {
    if (!app.appliedDate) return;
    const month = format(parseISO(app.appliedDate), 'MMM yyyy');
    months[month] = (months[month] || 0) + 1;
  });
  return Object.entries(months)
    .map(([month, count]) => ({ month, count }))
    .slice(-6);
};

export const groupByStatus = (applications) => {
  const groups = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
  applications.forEach((app) => {
    if (groups[app.status] !== undefined) groups[app.status]++;
  });
  return Object.entries(groups).map(([name, value]) => ({ name, value }));
};
