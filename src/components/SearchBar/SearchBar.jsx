import { MdSearch, MdClose } from 'react-icons/md';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search company or role...' }) {
  return (
    <div className="search-wrapper">
      <MdSearch size={18} className="search-icon" />
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
}
