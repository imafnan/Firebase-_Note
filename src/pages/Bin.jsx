import React from 'react';
import BinNotes from '../components/BinNotes';

const Bin = () => {
  const title = "Bin Notes"; 

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 w-full px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold relative inline-block dark:text-white">
            <span className="relative z-10 dark:text-white">
              {title}
            </span>
            <span className="absolute w-full h-1 bg-pink-400 left-0 bottom-0 rounded-lg"></span>
          </h2>
        </div>

        {/* Notes Section */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <BinNotes />
        </div>
      </div>
    </>
  );
};

export default Bin;
