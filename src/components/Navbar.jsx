// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Pet Health Tracker</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/add" className="hover:underline">Add Pet</Link></li>
          <li><Link to="/search" className="hover:underline">Search</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
// src/components/Navbar.jsx