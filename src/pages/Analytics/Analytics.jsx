import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { MdWork, MdEventNote, MdCheckCircle, MdCancel, MdTrendingUp } from 'react-icons/md';
import StatCard from '../../components/StatCard/StatCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useApplications } from '../../hooks/useApplications';
import { groupByStatus, groupByMonth, getStatusColor } from '../../utils/helpers';
import './Analytics.css';

const PLATFORM_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Analytics() {
  const { applications, loading, stats } = useApplications();

  const pieData = groupByStatus(applications).filter((d) => d.value > 0);
  const barData = groupByMonth(applications);

  // Platform breakdown
  const platforms = {};
  applications.forEach((a) => {
    platforms[a.platform] = (platforms[a.platform] || 0) + 1;
  });
  const platformData = Object.entries(platforms)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (loading) return <LoadingSpinner overlay />;

  const chartTooltipStyle = {
    contentStyle: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      color: 'var(--text-primary)',
      fontSize: 13,
    },
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Visualize your job search journey</p>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <StatCard icon={MdWork} label="Total Applied" value={stats.total} color="#6366f1" />
        <StatCard icon={MdEventNote} label="Interviewing" value={stats.interviews} color="#f59e0b" subtitle={stats.total ? `${Math.round(stats.interviews/stats.total*100)}% rate` : ''} />
        <StatCard icon={MdCheckCircle} label="Offers" value={stats.offers} color="#10b981" subtitle={stats.total ? `${Math.round(stats.offers/stats.total*100)}% rate` : ''} />
        <StatCard icon={MdCancel} label="Rejected" value={stats.rejections} color="#ef4444" subtitle={stats.total ? `${Math.round(stats.rejections/stats.total*100)}% rate` : ''} />
      </div>

      {applications.length === 0 ? (
        <EmptyState title="No data yet" description="Add job applications to see your analytics." />
      ) : (
        <>
          {/* Charts row */}
          <div className="charts-grid">
            {/* Pie chart */}
            <div className="glass-card">
              <div className="chart-header">
                <MdTrendingUp size={18} />
                Status Breakdown
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={getStatusColor(entry.name)} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart */}
            <div className="glass-card">
              <div className="chart-header">
                <MdTrendingUp size={18} />
                Monthly Applications
              </div>
              {barData.length === 0 ? (
                <EmptyState title="Not enough data" description="Apply to more jobs to see monthly trends." />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip {...chartTooltipStyle} />
                    <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} name="Applications" />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Platform table */}
          <div className="glass-card" style={{ marginTop: 20 }}>
            <div className="chart-header">
              <MdWork size={18} />
              Top Platforms
            </div>
            <div className="platform-table">
              {platformData.map((p, i) => (
                <div key={p.name} className="platform-row">
                  <div className="platform-rank">{i + 1}</div>
                  <div className="platform-name">{p.name}</div>
                  <div className="platform-bar-wrap">
                    <div
                      className="platform-bar"
                      style={{
                        width: `${(p.value / applications.length) * 100}%`,
                        background: PLATFORM_COLORS[i % PLATFORM_COLORS.length],
                      }}
                    />
                  </div>
                  <div className="platform-count">{p.value} apps</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
