'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FlashCardDesign from '../../Component/FlashCardDesign';
import { useAuth } from "@clerk/nextjs";
import dynamic from 'next/dynamic';

const DynamicFirebaseComponent = dynamic(() => import('../../Component/firebase-component'), { ssr: false });

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardComponent() {
  const [input, setInput] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [saveStatus, setSaveStatus] = useState("Save");
  const [loading, setLoading] = useState(false);
  const { isLoaded, userId } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/FlashCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-screen-lg flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-zinc-800 via-zinc-950 to-zinc-800">
      <h1 className="text-white font-mono lg:text-5xl text-4xl text-center font-semibold mt-44">
        Generate flash cards on anything.
      </h1>
      <div className="flex lg:flex-row flex-col justify-center items-center my-16 w-8/12">
        <Input
          className="w-full bg-zinc-950 text-zinc-200 shadow-xl"
          placeholder="Enter a topic"
          value={input}
          onChange={handleInputChange}
        />
        <Button variant="default" className="ml-4 bg-black lg:mt-0 mt-10" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
      {loading && <p className="text-white my-4">Generating flashcards, please wait...</p>}
      <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {flashcards.map((card, index) => (
          <FlashCardDesign key={index} question={card.question} answer={card.answer} />
        ))}
      </div>
      {isLoaded && userId && (
        <DynamicFirebaseComponent
          userId={userId}
          flashcards={flashcards}
          setSaveStatus={setSaveStatus}
        />
      )}
    </div>
  );
}