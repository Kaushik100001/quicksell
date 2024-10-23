import React, { useState } from 'react';
import GroupingControl from './GroupingControl';
import SortingControl from './SortingControl';
import Display from '../assets/Display.svg'; 
import down from '../assets/down.svg'

const DisplayDropdown = ({ grouping, setGrouping, sorting, setSorting }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="display-dropdown">
     
      <button className="dropdown-button" onClick={toggleDropdown}>
      <img src={Display} alt="Display" />
        Display
        <img src={down} alt="down"/>
      </button>
      
      {showDropdown && (
        <div className="dropdown-content">
          <div className="grouping-section">
            {/* <label>Grouping</label> */}
            <GroupingControl grouping={grouping} setGrouping={setGrouping} />
          </div>
          <div className="sorting-section">
            {/* <label>Ordering</label> */}
            <SortingControl sorting={sorting} setSorting={setSorting} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
