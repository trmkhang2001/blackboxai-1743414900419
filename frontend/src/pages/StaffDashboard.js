import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/bookings/staff/all', {
          credentials: 'include'
        });
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        <i className="fas fa-tachometer-alt mr-2"></i>
        Staff Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          <i className="fas fa-ticket-alt mr-2"></i>
          Ticket Management
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Movie</th>
              <th className="px-4 py-2 text-left">Show Time</th>
              <th className="px-4 py-2 text-left">Seat</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b">
                <td className="px-4 py-2">{ticket.Show?.Movie?.title}</td>
                <td className="px-4 py-2">{new Date(ticket.Show?.showTime).toLocaleString()}</td>
                <td className="px-4 py-2">{ticket.seatNumber}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    ticket.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;