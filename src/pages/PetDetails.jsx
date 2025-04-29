import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!pet) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{pet.name}</h2>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
      <p><strong>Last Checkup:</strong> {pet.last_checkup}</p>
      <p><strong>Diet:</strong> {pet.diet.join(', ')}</p>
      <p><strong>Owner:</strong> {pet.owner.name}</p>
      <p><strong>Contact:</strong> {pet.owner.contact}</p>

      <div className="mt-4 flex gap-4">
        <button 
          onClick={() => navigate(`/edit/${pet.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => navigate('/pets')}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default PetDetails;
