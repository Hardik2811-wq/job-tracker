import './Filters.css';

const STATUS_OPTIONS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];
const PLATFORM_OPTIONS = ['All', 'LinkedIn', 'Company Website', 'Naukri', 'Wellfound', 'Internshala', 'Referral'];
const LOCATION_OPTIONS = ['All', 'Remote', 'Hybrid', 'On-site'];
const SORT_OPTIONS = [
  { value: 'appliedDate-desc', label: 'Applied date — Newest' },
  { value: 'appliedDate-asc', label: 'Applied date — Oldest' },
  { value: 'interviewDate-asc', label: 'Interview — Soonest' },
  { value: 'interviewDate-desc', label: 'Interview — Latest' },
  { value: 'company-asc', label: 'Company A–Z' },
  { value: 'salary-desc', label: 'Salary High–Low' },
  { value: 'salary-asc', label: 'Salary Low–High' },
];

export default function Filters({ filters, onFilterChange, sortBy, onSortChange }) {
  return (
    <div className="filters-row">
      <select
        className="filter-select"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.platform}
        onChange={(e) => onFilterChange({ ...filters, platform: e.target.value })}
      >
        {PLATFORM_OPTIONS.map((p) => (
          <option key={p} value={p}>{p === 'All' ? 'All Platforms' : p}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.location}
        onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
      >
        {LOCATION_OPTIONS.map((l) => (
          <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
