import React from 'react';

const SortingControl = ({ sorting, setSorting }) => {
  return (
    <div className="sorting-control">
      <label>Order by :</label>
      <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingControl;
