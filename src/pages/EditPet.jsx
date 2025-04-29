import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('owner.')) {
      const ownerField = name.split('.')[1];
      setPet(prev => ({
        ...prev,
        owner: {
          ...prev.owner,
          [ownerField]: value
        }
      }));
    } else {
      setPet(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDietChange = (e) => {
    setPet(prev => ({
      ...prev,
      diet: e.target.value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/pets/${id}`, pet)
      .then(() => {
        Swal.fire('Updated!', 'Pet info updated successfully', 'success');
        navigate(`/pets/${id}`);
      })
      .catch(err => console.error(err));
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Pet Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={pet.name}
          onChange={handleChange}
          placeholder="Pet Name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="type"
          value={pet.type}
          onChange={handleChange}
          placeholder="Pet Type (e.g. Dog)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="age"
          value={pet.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border px-3 py-2 rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="vaccinated"
            checked={pet.vaccinated}
            onChange={(e) => setPet(prev => ({ ...prev, vaccinated: e.target.checked }))}
            className="mr-2"
          />
          Vaccinated
        </label>
        <input
          type="date"
          name="last_checkup"
          value={pet.last_checkup}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="diet"
          value={pet.diet.join(', ')}
          onChange={handleDietChange}
          placeholder="Diet (comma-separated)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="owner.name"
          value={pet.owner.name}
          onChange={handleChange}
          placeholder="Owner Name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="owner.contact"
          value={pet.owner.contact}
          onChange={handleChange}
          placeholder="Owner Contact"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPet;
