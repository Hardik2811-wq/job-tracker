import { useNavigate } from 'react-router-dom';
import {
  MdWork, MdEventNote, MdCheckCircle, MdCancel, MdAdd, MdTrendingUp
} from 'react-icons/md';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import StatCard from '../../components/StatCard/StatCard';
import JobCard from '../../components/JobCard/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useApplications } from '../../hooks/useApplications';
import { groupByStatus, getStatusColor, formatDate } from '../../utils/helpers';
import { toast } from 'react-toastify';
import './Dashboard.css';

const PIE_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { applications, loading, stats, remove, bookmark } = useApplications();

  const pieData = groupByStatus(applications).filter((d) => d.value > 0);
  const recent = [...applications].slice(0, 5);

  const handleDelete = (id) => {
    remove(id);
    toast.success('Application removed');
  };

  const handleEdit = (app) => navigate(`/applications/${app.id}`);
  const handleBookmark = (id) => bookmark(id);

  if (loading) return <LoadingSpinner overlay />;

  return (
    <div className="dashboard-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Here's your job search at a glance</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/applications/new')}>
          <MdAdd size={18} /> Add Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <StatCard icon={MdWork} label="Total Applied" value={stats.total} color="#6366f1" />
        <StatCard icon={MdEventNote} label="Interviewing" value={stats.interviews} color="#f59e0b" />
        <StatCard icon={MdCheckCircle} label="Offers" value={stats.offers} color="#10b981" />
        <StatCard icon={MdCancel} label="Rejected" value={stats.rejections} color="#ef4444" />
      </div>

      {/* Chart + Recent */}
      <div className="dashboard-grid">
        {/* Pie Chart */}
        <div className="glass-card">
          <div className="card-title">
            <MdTrendingUp size={18} />
            Application Pipeline
          </div>
          {pieData.length === 0 ? (
            <EmptyState title="No data yet" description="Add some job applications to see your pipeline." />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={getStatusColor(entry.name)}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Applications */}
        <div className="glass-card">
          <div className="card-title flex justify-between items-center">
            <span className="flex items-center gap-2"><MdWork size={18} /> Recent Applications</span>
            <button className="btn-link" onClick={() => navigate('/applications')}>View all →</button>
          </div>
          {recent.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Start tracking your job search!"
              action={{ label: '+ Add First Job', onClick: () => navigate('/applications/new') }}
            />
          ) : (
            <div className="recent-list">
              {recent.map((app) => (
                <div key={app.id} className="recent-item" onClick={() => navigate(`/applications/${app.id}`)}>
                  <div className="recent-info">
                    <span className="recent-company">{app.company}</span>
                    <span className="recent-role">{app.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="status-badge"
                      style={{ color: getStatusColor(app.status), background: `${getStatusColor(app.status)}20` }}
                    >
                      {app.status}
                    </span>
                    <span className="recent-date">{formatDate(app.appliedDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
