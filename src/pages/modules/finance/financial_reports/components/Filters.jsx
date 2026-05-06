import React from "react";

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Date From</label>
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={onFilterChange}
        />
      </div>
      <div className="filter-group">
        <label>Date To</label>
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={onFilterChange}
        />
      </div>
      <div className="filter-group">
        <label>Company</label>
        <select name="company" value={filters.company} onChange={onFilterChange}>
          <option value="">All Companies</option>
          <option value="Tech Corp">Tech Corp</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Branch</label>
        <select name="branch" value={filters.branch} onChange={onFilterChange}>
          <option value="">All Branches</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Department</label>
        <select name="department" value={filters.department} onChange={onFilterChange}>
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
