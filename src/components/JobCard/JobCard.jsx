import { motion } from 'framer-motion';
import { MdEdit, MdDelete, MdBookmark, MdBookmarkBorder, MdCalendarToday, MdLocationOn, MdAttachMoney } from 'react-icons/md';
import { getStatusColor, getStatusBg, formatDate, salaryDisplay } from '../../utils/helpers';
import { getLogoUrl } from '../../services/api';
import './JobCard.css';

export default function JobCard({ application, onEdit, onDelete, onBookmark }) {
  const { company, domain, role, location, salary, status, appliedDate, bookmarked } = application;
  const statusColor = getStatusColor(status);
  const statusBg = getStatusBg(status);

  return (
    <motion.div
      className="job-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-header">
        <div className="company-info">
          <div className="company-logo">
            <img
              src={getLogoUrl(domain || `${company.toLowerCase().replace(/\s+/g,'')}.com`)}
              alt={company}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="logo-fallback" style={{ display: 'none' }}>
              {company[0]}
            </div>
          </div>
          <div>
            <h3 className="company-name">{company}</h3>
            <p className="role-title">{role}</p>
          </div>
        </div>
        <span
          className="status-badge"
          style={{ color: statusColor, background: statusBg }}
        >
          <span className="status-dot" style={{ background: statusColor }} />
          {status}
        </span>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <MdLocationOn size={14} />
          <span>{location || 'Remote'}</span>
        </div>
        <div className="meta-item">
          <MdCalendarToday size={14} />
          <span>{formatDate(appliedDate)}</span>
        </div>
        <div className="meta-item">
          <MdAttachMoney size={14} />
          <span>{salaryDisplay(salary)}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="action-btn edit" onClick={() => onEdit(application)} title="Edit">
          <MdEdit size={16} />
          Edit
        </button>
        <button className="action-btn delete" onClick={() => onDelete(application.id)} title="Delete">
          <MdDelete size={16} />
          Delete
        </button>
        <button
          className={`action-btn bookmark ${bookmarked ? 'bookmarked' : ''}`}
          onClick={() => onBookmark(application.id)}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          {bookmarked ? <MdBookmark size={16} /> : <MdBookmarkBorder size={16} />}
        </button>
      </div>
    </motion.div>
  );
}
