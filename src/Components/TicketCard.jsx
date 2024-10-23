import React from 'react';

// Image imports for different priorities
import urgentIcon from '../assets/urgentGrey.svg'; 
import highPriorityIcon from '../assets/HighPriority.svg'; 
import mediumPriorityIcon from '../assets/MediumPriority.svg'; 
import lowPriorityIcon from '../assets/LowPriority.svg'; 
import noPriorityIcon from '../assets/Nopriority.svg'; 

import openIcon from '../assets/Backlog.svg'; 
import inProgressIcon from '../assets/in-progress.svg'; 
import TodoIcon from '../assets/To-do.svg'; 
import closedIcon from '../assets/Cancelled.svg'; 

import profileImage from '../assets/profileImage.svg';

const TicketCard = ({ ticket, userName, userImage, tag, status, grouping }) => {
  // Map priority values to corresponding images
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      case 0:
      default:
        return noPriorityIcon;
    }
  };

  // Map status values to corresponding images
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return openIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Todo':
        return TodoIcon;
      case 'Closed':
        return closedIcon;
      default:
        return null; // Return a default image if needed
    }
  };

  return (
    <div className="ticket-card">
      <div className='heading'>
        <p className='ticketId'>{ticket.id}</p>
        {userImage && <img className='profile' src={userImage} alt="Profile" />}
      </div>
     
      <h4 className='title'>
      {(grouping === 'assigned_to' || grouping === 'priority') && (
          <img className='status-icon' src={getStatusIcon(ticket.status)} alt="Status Icon" />
        )}
        {ticket.title} 
       
      </h4>
      
      {/* Always show tag */}
      <div className='tag'>
        {/* Only show priority icon if not grouped by priority */}
        {grouping !== 'priority' && (
          <img className='ticketIcon' src={getPriorityIcon(ticket.priority)} alt="Priority Icon" />
        )}
        <p className='ticketTag'>{tag}</p>
      </div>
    </div>
  );
};

export default TicketCard;
