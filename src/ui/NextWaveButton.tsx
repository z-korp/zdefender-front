import React from 'react';

interface NewGameButtonProps {
  onClick: () => void;
}

const NextWaveButton: React.FC<NewGameButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      style={{ width: '160px', position: 'absolute', bottom: '0', right: '2rem' }}
      onClick={onClick}
    >
      Next Wave
    </button>
  );
};

export default NextWaveButton;
