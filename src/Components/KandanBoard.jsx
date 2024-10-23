import React from 'react';
import TicketCard from './TicketCard';
import add from '../assets/add.svg';
import menu from '../assets/menu.svg';
import urgentIcon from '../assets/urgentOrange.svg';
import highPriorityIcon from '../assets/HighPriority.svg';
import mediumPriorityIcon from '../assets/MediumPriority.svg';
import lowPriorityIcon from '../assets/LowPriority.svg';
import noPriorityIcon from '../assets/Nopriority.svg';
// Status icons
import Todo from '../assets/To-do.svg';
import inProgress from '../assets/in-progress.svg';
import Backlog from '../assets/Backlog.svg';

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? { name: user.name, image: user.profileImage } : { name: 'Unknown User', image: null };
  };

  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      const groupKey = groupBy === 'assigned_to' ? findUserName(ticket.userId).name : ticket[groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => parseInt(b.priority) - parseInt(a.priority));
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return tickets;
    }
  };

  // Map priority values to corresponding labels and icons
  const getPriorityLabelAndIcon = (priority) => {
    switch (priority) {
      case '4':
        return { label: 'Urgent', icon: urgentIcon };
      case '3':
        return { label: 'High', icon: highPriorityIcon };
      case '2':
        return { label: 'Medium', icon: mediumPriorityIcon };
      case '1':
        return { label: 'Low', icon: lowPriorityIcon };
      case '0':
      default:
        return { label: 'No Priority', icon: noPriorityIcon };
    }
  };

  // Map status values to corresponding labels and icons
  const getStatusLabelAndIcon = (status) => {
    switch (status) {
      case 'Todo':
        return { label: 'Todo', icon: Todo };
      case 'In progress':
        return { label: 'In Progress', icon: inProgress };
      case 'Backlog':
        return { label: 'Backlog', icon: Backlog };
      default:
        return { label: 'Unknown Status', icon: null };
    }
  };

  const groupedTickets = groupTickets(tickets, grouping);
  const sortedGroups = grouping === 'assigned_to'
    ? Object.keys(groupedTickets).sort((a, b) => a.localeCompare(b))
    : Object.keys(groupedTickets);

  return (
    <div className="kanban-board">
      {sortedGroups.map((group, idx) => {
        const { label, icon } = grouping === 'priority'
          ? getPriorityLabelAndIcon(group)
          : grouping === 'status'
            ? getStatusLabelAndIcon(group)
            : { label: group, icon: null };

        return (
          <div key={idx} className="kanban-column">
            <div className='addMenu'>
              <h3>
                {icon && <img src={icon} alt={`${label} icon`} />} {label} <span className='number'> {groupedTickets[group].length} </span>
              </h3>
              <div className='logo'>
                <p><img src={add} alt="add" /></p>
                <p><img src={menu} alt="menu" /></p>
              </div>
            </div>

            {sortTickets(groupedTickets[group], sorting).map((ticket) => {
              const { name, image } = findUserName(ticket.userId);
              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  userName={name}
                  userImage={image} // Pass user image
                  tag={ticket.tag}
                  status={ticket.status} // Pass ticket status
                  grouping={grouping} // Pass grouping to conditionally show status icon
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
