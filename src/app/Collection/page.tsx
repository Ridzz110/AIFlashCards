"use client";
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Collection() {
  const [flashcardStacks, setFlashcardStacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId } = useAuth(); // Ensure auth is loaded

  useEffect(() => {
    if (typeof window !== 'undefined' && userId && isLoaded) {
      const fetchFlashcardStacks = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, 'users', userId, 'flashcardsStacks')
          );
          const stacks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFlashcardStacks(stacks);
        } catch (error) {
          console.error('Error fetching flashcard stacks:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchFlashcardStacks();
    }
  }, [userId, isLoaded]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col flex-wrap justify-center bg-gradient-to-tr from-zinc-950 to-zinc-800 items-center text-white">
      <h1 className='text-4xl font-semibold my-10'>Collections</h1>
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
    </div>
  );
}
