import '../css/FilterDropdown.css';

function FilterDropdown({ filterOption, onFilterChange }) {
  return (
    <select
      className="filter-dropdown"
      value={filterOption}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="firstName">First Name (A → Z)</option>
      <option value="lastName">Last Name (A → Z)</option>
      <option value="oldest">Oldest To First</option>
    </select>
  );
}

export default FilterDropdown;