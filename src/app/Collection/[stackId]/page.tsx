"use client";
// app/collection/[stackId]/page.tsx

import { useState, useEffect } from 'react';
import { db } from '../../../firebase'; // Adjust the path to your firebase.js file
import { doc, getDoc } from 'firebase/firestore';
import FlashCardDesign from '@/Component/flashCardDesign';
import { useAuth } from '@clerk/nextjs';

interface Flashcard {
  question: string;
  answer: string;
}

interface CollectionPageProps {
  params: {
    stackId: string;
    userId: string; // Add userId to params
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { stackId } = params;
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCards = async () => {
      if (stackId && userId) {
        console.log('Fetching stack with ID:', stackId); // Log stackId
        try {
          // Decode the stackId if it contains URL-encoded characters
          const decodedStackId = decodeURIComponent(stackId);
          console.log('Decoded stack ID:', decodedStackId); // Log decoded stackId

          // Reference the specific user's flashcardsStacks collection
          const stackRef = doc(db, 'users', userId, 'flashcardsStacks', decodedStackId);
          const docSnapshot = await getDoc(stackRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const flashcards = data?.flashcards || []; // Access the 'flashcards' array
            console.log('Fetched flashcards:', flashcards); // Log fetched flashcards
            setCards(flashcards);
          } else {
            console.error('No such document with ID:', decodedStackId);
            setError(`No such document with ID: ${decodedStackId}`);
          }
        } catch (error) {
          console.error('Error fetching cards:', error);
          setError('Error fetching cards.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No stack ID or user ID provided.');
        setLoading(false);
      }
    };

    fetchCards();
  }, [stackId, userId]);

  if (loading) return <div className='bg-gradient-to-tr flex flex-col items-center from-zinc-800 to-zinc-950 w-full min-h-screen text-white font-semibold p-6'>Loading...</div>
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gradient-to-tr flex flex-col items-center from-zinc-800 to-zinc-950 w-full min-h-screen p-6">
      <h1 className='text-4xl font-semibold text-white mt-6'>Cards in Stack</h1>
      <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <FlashCardDesign key={index} question={card.question} answer={card.answer} />
          ))
        ) : (
          <p className="text-white">No cards found in this stack.</p>
        )}
      </div>
    </div>
  );
}
