import React from 'react';
import { AddSchoolForm } from './Components/molecules/AddSchoolForm';
import { ClosestSchoolList } from './Components/atoms/ClosestSchoolList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">School Finder</h1>
      <AddSchoolForm />
      <ClosestSchoolList />
    </div>
  );
};

export default App;
