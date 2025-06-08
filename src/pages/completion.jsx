import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Completion = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <p className="text-gray-700 mb-6">No data to display.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-block px-6 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Submission Successful
        </h2>
        <ul className="divide-y divide-gray-200 mb-8">
          {Object.entries(state).map(([key, value]) => (
            <li key={key} className="py-3 flex justify-between">
              <span className="capitalize font-semibold text-gray-700">{formatLabel(key)}</span>
              <span className="text-gray-900">{value}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};


const formatLabel = (label) => {
  
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export default Completion;
