import { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";

interface Flashcard {
  question: string;
  answer: string;
}

interface FirebaseComponentProps {
  userId: string;
  flashcards: Flashcard[];
  setSaveStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FirebaseComponent: React.FC<FirebaseComponentProps> = ({ userId, flashcards, setSaveStatus }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const stackName = prompt("Enter a name for your stack of flashcards:");
    if (!stackName) {
      console.error('No name provided for the stack');
      setSaving(false);
      return;
    }

    try {
      const stackRef = doc(db, `users/${userId}/flashcardsStacks/${stackName}`);
      await setDoc(stackRef, { name: stackName, flashcards });
      console.log('Flashcards stack saved successfully');
      setSaveStatus("Saved!");

      setTimeout(() => setSaveStatus("Save"), 1000);
    } catch (error) {
      console.error('Error saving flashcards:', error);
      setSaveStatus("Error Saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button className="bg-black mb-10" onClick={handleSave} disabled={saving || !flashcards.length}>
      {saving ? "Saving..." : "Save"}
    </Button>
  );
};

export default FirebaseComponent;