import React, { useState } from 'react';

const MobileFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Кнопка для відкриття фільтрів */}
      <button 
        onClick={toggleFilter} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Відкрити фільтри
      </button>

      {/* Фільтри (мобільна версія) */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-start bg-black bg-opacity-20 z-50">
          {/* Блок фільтрів */}
          <div className="bg-white w-5/6 h-full p-5 shadow-xl transform transition-all ease-in-out duration-300">
            <h2 className="text-lg font-semibold mb-4">Фільтри</h2>
            {/* Тут можуть бути ваші фільтри */}
            <div className="mb-4">
              <label>Фільтр 1</label>
              <input type="checkbox" className="ml-2" />
            </div>
            <div className="mb-4">
              <label>Фільтр 2</label>
              <input type="checkbox" className="ml-2" />
            </div>
            <button 
              onClick={toggleFilter} 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md">
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilters;
