// src/pages/PetList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pets') // adjust if using a different JSON-server port
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Registered Pets</h2>
      <ul className="grid gap-4">
        {pets.map((pet) => (
          <li key={pet.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{pet.name} ({pet.type})</h3>
            <p>Age: {pet.age}</p>
            <p>Vaccinated: {pet.vaccinated ? 'Yes' : 'No'}</p>
            <p>Last Checkup: {pet.last_checkup}</p>
            <Link to={`/pets/${pet.id}`} className="text-blue-600 underline mt-2 inline-block">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
