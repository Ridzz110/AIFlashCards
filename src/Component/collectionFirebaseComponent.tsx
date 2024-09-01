import { useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface FlashcardStack {
  id: string;
  name: string;
  flashcards: { question: string; answer: string }[];
}

interface CollectionFirebaseComponentProps {
  userId: string;
  setFlashcardStacks: React.Dispatch<React.SetStateAction<FlashcardStack[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionFirebaseComponent: React.FC<CollectionFirebaseComponentProps> = ({ userId, setFlashcardStacks, setLoading }) => {
  useEffect(() => {
    const fetchFlashcardStacks = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'users', userId, 'flashcardsStacks')
        );
        const stacks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FlashcardStack[];
        setFlashcardStacks(stacks);
      } catch (error) {
        console.error('Error fetching flashcard stacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardStacks();
  }, [userId, setFlashcardStacks, setLoading]);

  return null; // This component doesn't render anything
};

export default CollectionFirebaseComponent;