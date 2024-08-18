"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FlashCardDesign from '../../Component/FlashCardDesign';
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardComponent() {
  const [input, setInput] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [saveStatus, setSaveStatus] = useState("Save");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleGenerate = async () => {
    console.log("button pressed!");
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
      console.log('Generated flashcards:', data);
      setFlashcards(data.flashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser as User;
    const userId = user?.uid;

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    const stackName = prompt("Enter a name for your stack of flashcards:");
    if (!stackName) {
      console.error('No name provided for the stack');
      return;
    }

    try {
      const stackRef = doc(db, `users/${userId}/flashcardsStacks/${stackName}`);
      
      // Save the entire stack of flashcards as a single document
      await setDoc(stackRef, {
        name: stackName,
        flashcards: flashcards
      });

      console.log('Flashcards stack saved successfully');
      setSaveStatus("Saved!");
      
      // Reset save status back to "Save" after 1 second
      setTimeout(() => setSaveStatus("Save"), 1000);
    } catch (error) {
      console.error('Error saving flashcards:', error);
    }
  };

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
        <Button variant="default" className="ml-4 bg-black lg:mt-0 mt-10" onClick={handleGenerate}>
          Generate
        </Button>
      </div>
      <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {flashcards.map((card, index) => (
          <FlashCardDesign key={index} question={card.question} answer={card.answer} />
        ))}
      </div>
      <Button className="bg-black mb-10" onClick={handleSave}>{saveStatus}</Button>
    </div>
  );
}
