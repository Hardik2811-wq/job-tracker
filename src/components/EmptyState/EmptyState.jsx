import { MdSearchOff, MdWork } from 'react-icons/md';
import './EmptyState.css';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <MdSearchOff size={40} />
      </div>
      <h3>{title || 'No applications found'}</h3>
      <p>{description || 'Try adjusting your search or filters.'}</p>
      {action && (
        <button className="btn btn-primary" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
