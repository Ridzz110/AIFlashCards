import React from 'react';

interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCardDesign: React.FC<FlashCardProps> = ({ question, answer }) => {
  return (
    <div className="relative w-72 px-4 h-72 border rounded-xl border-spacing-1 border-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 to-bg-zinc-900  rounded-xl text-white p-4 transition-opacity duration-300 opacity-100 hover:opacity-0">
        <p>{question}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black rounded-xl text-white p-4 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <p>{answer.slice(0,200)}</p>
      </div>
    </div>
  );
};

export default FlashCardDesign;
