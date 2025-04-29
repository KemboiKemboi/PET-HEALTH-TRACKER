import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterPet from './pages/RegisterPet';
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails';
import EditPet from './pages/EditPet';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPet />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/edit/:id" element={<EditPet />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
