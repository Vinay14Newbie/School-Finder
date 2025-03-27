import React, { useState } from 'react';
import { AddSchoolForm } from './Components/molecules/AddSchoolForm';
import { ClosestSchoolList } from './Components/molecules/ClosestSchoolList';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 lg:mt-6 mt-14">
        School Mangement App
      </h1>
      <ClosestSchoolList />
      <button
        onClick={() => setShowModal(true)}
        className="fixed left-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Add School
      </button>

      {showModal && <AddSchoolForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
