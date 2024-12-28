import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { RxReset } from "react-icons/rx";
import { useSelector } from 'react-redux';

const BinNotes = () => {
  // Redux for user data
  const sliceUser = useSelector((state) => state.userData.value);

  // State for bin notes
  const [allBinNote, setAllBinNote] = useState([]);

  // Firebase database reference
  const db = getDatabase();

  // Function to remove a note
  const handleRemove = (removeNoteId) => {
    remove(ref(db, 'removeNote/' + removeNoteId));
  };

  // Fetch notes from Firebase
  useEffect(() => {
    onValue(ref(db, 'removeNote/'), (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().creatorId === sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setAllBinNote(arr);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Your Deleted Notes
      </h1>

      {/* Display Notes */}
      {allBinNote.length > 0 ? (
        <div className="space-y-4">
          {allBinNote.map((item) => (
            <div
              key={item.key}
              className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 flex justify-between items-center"
            >
              {/* Note Title */}
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {item.noteTitle || "Untitled Note"}
              </h2>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {/* Delete Button */}
                <button
                  onClick={() => handleRemove(item.key)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg shadow-md
                             hover:bg-red-700 hover:scale-105 transition transform duration-300"
                >
                  Delete
                </button>

                {/* Reset Button */}
                <button
                  className="px-4 py-2 bg-green-500 text-white font-semibold text-sm rounded-lg shadow-md
                             hover:bg-green-600 hover:scale-105 transition transform duration-300 flex items-center space-x-2"
                >
                  <RxReset className="h-5 w-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
          No notes found in the bin.
        </p>
      )}
    </div>
  );
};

export default BinNotes;
