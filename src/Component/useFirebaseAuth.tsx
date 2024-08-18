import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase config (add your own config here)
const firebaseConfig = {
    apiKey: "AIzaSyDpU2k4iSub_nSxEIpX_J9P88afpU7ehzE",
    authDomain: "flashcards-751bf.firebaseapp.com",
    projectId: "flashcards-751bf",
    storageBucket: "flashcards-751bf.appspot.com",
    messagingSenderId: "751155450993",
    appId: "1:751155450993:web:209ddca3d009e633a2b7d0",
    measurementId: "G-VTQSRJCVBT"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const useFirebaseAuth = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const signInToFirebase = async () => {
      if (user) {
        try {
          // Get custom token from Clerk
          const token = await getToken({ template: "integration_firebase" });

          // Sign into Firebase with the custom token
          await signInWithCustomToken(auth, token || "");

          // Save user to Firestore
          const userRef = doc(db, "users", user.id);
          await setDoc(userRef, {
            email: user.primaryEmailAddress?.emailAddress,
            stripeCustomerId: null, // Add this once you have Stripe set up
          });

          console.log("User signed in and saved to Firestore!");
        } catch (error) {
          console.error("Error signing in to Firebase:", error);
        }
      }
    };

    signInToFirebase();
  }, [user, getToken]);

  return null;
};

export default useFirebaseAuth;
