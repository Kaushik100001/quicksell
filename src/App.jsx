import React, { useState, useEffect } from 'react';
import KanbanBoard from './Components/KandanBoard';
import DisplayDropdown from './Components/DisplayDropdown';

const App = () => {
  // Initialize the state with localStorage values (or default values if not present)
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem('grouping') || 'status'
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem('sorting') || 'priority'
  );

  // Fetch tickets and users from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.log('Error fetching tickets:', error));
  }, []);

  // Save grouping to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  // Save sorting to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sorting', sorting);
  }, [sorting]);

  return (
    <div>
      <div className="Navbar">
        <DisplayDropdown
          grouping={grouping}
          setGrouping={setGrouping}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  );
};

export default App;
