import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAdd, MdBookmark } from 'react-icons/md';
import { toast } from 'react-toastify';
import JobCard from '../../components/JobCard/JobCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import EmptyState from '../../components/EmptyState/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useApplications } from '../../hooks/useApplications';
import { useDebounce } from '../../hooks/useDebounce';
import './Applications.css';

const TABS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked'];

const DEFAULT_FILTERS = { status: 'All', platform: 'All', location: 'All' };

export default function Applications() {
  const navigate = useNavigate();
  const { applications, loading, remove, bookmark, stats } = useApplications();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('appliedDate-desc');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const filtered = useMemo(() => {
    let result = [...applications];

    // Tab filter
    if (activeTab === 'Bookmarked') {
      result = result.filter((a) => a.bookmarked);
    } else if (activeTab !== 'All') {
      result = result.filter((a) => a.status === activeTab);
    }

    // Filter dropdowns
    if (filters.status !== 'All') result = result.filter((a) => a.status === filters.status);
    if (filters.platform !== 'All') result = result.filter((a) => a.platform === filters.platform);
    if (filters.location !== 'All') result = result.filter((a) => a.location === filters.location);

    // Search
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
      );
    }

    // Sort
    const [sortField, sortDir] = sortBy.split('-');
    result.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (sortField === 'salary') { aVal = Number(aVal); bVal = Number(bVal); }
      if (sortField === 'appliedDate') { aVal = new Date(aVal); bVal = new Date(bVal); }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [applications, activeTab, filters, debouncedSearch, sortBy]);

  const handleDelete = (id) => {
    remove(id);
    toast.success('Application deleted');
  };

  const handleEdit = (app) => navigate(`/applications/${app.id}`);
  const handleBookmark = (id) => bookmark(id);

  const tabCounts = {
    All: applications.length,
    Applied: stats.applied,
    Interviewing: stats.interviews,
    Offer: stats.offers,
    Rejected: stats.rejections,
    Bookmarked: applications.filter((a) => a.bookmarked).length,
  };

  if (loading) return <LoadingSpinner overlay />;

  return (
    <div className="applications-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">{applications.length} total applications tracked</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/applications/new')}>
          <MdAdd size={18} /> Add Job
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-row">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Bookmarked' && <MdBookmark size={14} />}
            {tab}
            {tabCounts[tab] > 0 && (
              <span className="tab-count">{tabCounts[tab]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="controls-row">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters filters={filters} onFilterChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {/* Results count */}
      <div className="results-info">
        Showing <strong>{filtered.length}</strong> of <strong>{applications.length}</strong> applications
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No results found' : 'No applications here'}
          description={searchQuery ? `No matches for "${searchQuery}"` : 'Try a different tab or add a new application.'}
          action={{ label: '+ Add Application', onClick: () => navigate('/applications/new') }}
        />
      ) : (
        <motion.div className="cards-grid" layout>
          <AnimatePresence>
            {filtered.map((app) => (
              <JobCard
                key={app.id}
                application={app}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBookmark={handleBookmark}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
