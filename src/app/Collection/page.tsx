"use client";
import { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Adjust the path to your firebase.js file
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Collection() {
  const [flashcardStacks, setFlashcardStacks] = useState<any[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFlashcardStacks = async () => {
      if (userId) {
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
        }
      }
    };

    fetchFlashcardStacks();
  }, [userId]);

  return (
    <div className="w-full min-h-screen flex flex-col flex-wrap justify-center bg-gradient-to-tr from-zinc-950 to-zinc-800 items-center text-white">
        <h1 className='text-4xl font-semibold my-10'>Collections</h1>
        <div className=' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1'>
      {flashcardStacks.map((stack) => (
        <Link  href={`/Collection/${stack.id}`} key={stack.id}>
        <div key={stack.id} className="m-4 p-6 bg-gradient-to-tr from-bg-zinc-900 to-bg-black border border-white border-spacing-1  rounded-lg shadow-lg w-60">
          <h2 className="text-xl font-bold mb-2">{stack.name}</h2>
          <p className="text-gray-300">Number of cards: {stack.cardCount || 'Unknown'}</p>
          {/* You can add more info or buttons here */}
        </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
