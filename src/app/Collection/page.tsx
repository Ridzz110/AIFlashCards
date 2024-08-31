'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicFirebaseComponent = dynamic(() => import('../../Component/collection-firebase-component'), { ssr: false });

interface FlashcardStack {
  id: string;
  name: string;
  flashcards: { question: string; answer: string }[];
}

export default function Collection() {
  const [flashcardStacks, setFlashcardStacks] = useState<FlashcardStack[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col flex-wrap justify-center bg-gradient-to-tr from-zinc-950 to-zinc-800 items-center text-white">
      <h1 className='text-4xl font-semibold my-10'>Collections</h1>
      {isLoaded && userId && (
        <DynamicFirebaseComponent
          userId={userId}
          setFlashcardStacks={setFlashcardStacks}
          setLoading={setLoading}
        />
      )}
      {loading ? (
        <div>Loading flashcard stacks...</div>
      ) : (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1'>
          {flashcardStacks.length ? (
            flashcardStacks.map((stack) => (
              <Link href={`/Collection/${stack.id}`} key={stack.id}>
                <div className="m-4 p-6 bg-gradient-to-tr from-bg-zinc-900 to-bg-black border border-white rounded-lg shadow-lg w-60">
                  <h2 className="text-xl font-bold mb-2">{stack.name}</h2>
                  <p className="text-gray-300">Number of cards: {stack.flashcards?.length || 'Unknown'}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No flashcard collections found.</p>
          )}
        </div>
      )}
    </div>
  );
}