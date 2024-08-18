"use client";
import React from 'react';
import img from '../assets/will-h-mcmahan-S3JdHNXSfnA-unsplash.jpg'
import img2 from '../assets/jo-szczepanska-bjemWZcNF34-unsplash.jpg'
import Image from 'next/image';
import {Button} from '../components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { Facebook, Twitter, Linkedin } from "lucide-react";
  import { getCheckoutUrl } from "../stripePayment"; // Import your function
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase"; // Your Firebase configuration
import Link from 'next/link';


  
export default function LandingPage() {

    const handleCheckout = async (priceId: string) => {
        try {
          const app: FirebaseApp = initializeApp(firebaseConfig); // Initialize Firebase app
          const checkoutUrl = await getCheckoutUrl(app, priceId); // Get the checkout URL from Firebase Functions
          window.location.href = checkoutUrl; // Redirect to Stripe Checkout page
        } catch (error) {
          console.error("Error during checkout:", error);
        }
      };

   
  return (
    <>
    <div className="min-h-screen overflow-x-hidden w-full flex items-center justify-center bg-gradient-to-tr from-zinc-800 via-zinc-950 to-zinc-800 text-white p-12 grid lg:grid-cols-2 grid-cols-1">
      <div className="text-left">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono">AI Flashcards</h1>
        <p className="text-xl text-zinc-400 font-mono font-light tracking-wide mt-8">
          AI Flashcards is a web application that uses AI to help you study for exams. use genrative AI to make customized flashcards that helps you study
        </p>
        <div className='mt-10'>
        <Link href="/Flashcard" passHref>
              <Button>Try now</Button>
            </Link>
        <Button variant="outline" className='ml-4 text-zinc-900'>Learn more</Button>
        </div>
      </div>
      <div className='p-4'>
        <Image src={img} alt="display_img" className='rounded-xl shadow-xl'/>
      </div>
    </div>
    <div className="min-h-screen overflow-x-hidden w-full flex items-center justify-center bg-black text-white p-12 grid lg:grid-cols-2 grid-cols-1">
      <div className='mr-8'>
        <Image src={img2} alt="display_img" className='rounded-xl shadow-xl'/>
      </div>
      <div className="text-left">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono my-4">why use flashcards?</h1>
        <p className='font-mono text-zinc-400 font-lg mt-4'>Customize your flashcards with AI-generated content and visuals. Tailor the learning experience to your needs and preferences.</p>
        <div className='mt-14 grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='shadow-xl w-full rounded-xl h-36 p-4 bg-gradient-to-tr from-zinc-900 to-zinc-950 flex justify-between items-center'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="currentColor" 
              className="size-14 text-white" // Apply the same color class
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
              />
            </svg>
            <div className="ml-4 w-11/12 ">
              <p className="text-white text-xl font-semibold font-mono">Customize Content</p>
              <p className="text-zinc-400 text-sm mt-2 font-mono">Easily edit and refine the content of your flashcards.</p>
            </div>

        </div>
        <div className='shadow-xl w-full rounded-xl h-36 p-4 bg-gradient-to-tr from-zinc-900 to-zinc-950 flex justify-between items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="size-14 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <div className="ml-4 w-11/12">
              <p className="text-white text-xl font-semibold font-mono">Fast response</p>
              <p className="text-zinc-400 text-sm mt-2 font-mono">saves tones of your time with the help of generative AI</p>
            </div>
        </div>
        <div className='shadow-xl w-full rounded-xl h-36 p-4 bg-gradient-to-tr from-zinc-900 to-zinc-950 flex justify-between items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" className="size-14">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
            <div className="ml-4 w-11/12">
                <p className="text-white text-xl font-semibold font-mono">Time effecient</p>
                <p className="text-zinc-400 text-sm mt-2 font-mono">Saves time so you can focus on your studies</p>
            </div>
        </div>
        <div className='shadow-xl w-full rounded-xl h-36 p-4 bg-gradient-to-tr from-zinc-900 to-zinc-950 flex justify-between items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" className="size-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <div className="ml-4 ">
                <p className="text-white text-xl font-semibold font-mono">Download</p>
                <p className="text-zinc-400 text-sm mt-2 font-mono">You can download your cards as well</p>
            </div>
        </div>
        </div>
      </div>
    </div>
    
    <div id="pricing" className="flex flex-col items-center w-full min-h-screen bg-gradient-to-bl from-black via-zinc-800 to-zinc-950 justify-center py-12">
        <h1 className="lg:text-4xl text-3xl font-bold mb-8 text-white text-center">AI Flashcards Pricing</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
            {/* Basic Plan */}
            <Card className="shadow-lg bg-zinc-950 text-white p-4 w-full mx-auto md:mx-0">
              <CardHeader>
                <CardTitle>Basic Plan</CardTitle>
                <CardDescription className="font-mono mt-4">Get started with AI-generated flashcards</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="mt-4">
                <p className="text-3xl font-bold mb-4">$0/month</p>
                <ul className="mb-4">
                  <li className="text-zinc-500 font-mono">Up to 500 flashcards</li>
                  <li className="text-zinc-500 font-mono">Basic AI Generation</li>
                  <li className="text-zinc-500 font-mono">Email Support</li>
                </ul>
                <Button variant="outline" className="w-full text-zinc-950">Try Now</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="shadow-lg bg-zinc-950 text-white p-4 w-full mx-auto md:mx-0">
              <CardHeader>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription className="font-mono mt-4">Advanced features for power users</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="mt-4">
                <p className="text-3xl font-bold mb-4">$29/month</p>
                <ul className="mb-4">
                  <li className="text-zinc-500 font-mono">Unlimited flashcards</li>
                  <li className="text-zinc-500 font-mono">Advanced AI Generation</li>
                  <li className="text-zinc-500 font-mono">Priority Support</li>
                </ul>
                <Button variant="outline" className="w-full text-zinc-950" onClick={() => handleCheckout('price_1PolrNP2iSDVQtOptpWnMRPL')}>Get it</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="shadow-lg bg-zinc-950 text-white p-4 w-full mx-auto md:mx-0">
              <CardHeader>
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription className="font-mono mt-4">Complete solution for teams and enterprises</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="mt-4">
                <p className="text-3xl font-bold mb-4">$99/month</p>
                <ul className="mb-4">
                  <li className="text-zinc-500 font-mono">Unlimited flashcards</li>
                  <li className="text-zinc-500 font-mono">Custom AI Training</li>
                  <li className="text-zinc-500 font-mono">Dedicated Account Manager</li>
                </ul>
                <Button variant="outline" className="w-full text-zinc-950" onClick={() => handleCheckout('price_1Poo6PP2iSDVQtOp9dGj04u6')}>Get it</Button>
              </CardContent>
            </Card>
          </div>
        </div>
    <footer className="bg-zinc-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold">Flashcards AI</h3>
            <p className="mt-2 text-zinc-500 font-mono text-md">AI-powered flashcards for all your learning needs.</p>
            <p className="mt-4 text-zinc-500 font-mono text-md">123 AI Street<br />Tech City, TC 45678</p>
            <p className="mt-2 text-zinc-500 font-mono text-md">Email: contact@flashcardsai.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline text-zinc-500 font-mono text-md">Home</a></li>
              <li><a href="#" className="hover:underline text-zinc-500 font-mono text-md">Pricing</a></li>
              <li><a href="#" className="hover:underline text-zinc-500 font-mono text-md">About Us</a></li>
              <li><a href="#" className="hover:underline text-zinc-500 font-mono text-md">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-semibold">Follow Us</h3>
            <p className="mt-4 text-zinc-500 font-mono text-md">Stay connected with us on social media.</p>
            <div className="flex space-x-4 mt-4">
              <Button variant="outline" size="icon" asChild>
                <a href="#">
                  <Facebook className="w-5 h-5 text-zinc-950" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#">
                  <Twitter className="w-5 h-5 text-zinc-950" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#">
                  <Linkedin className="w-5 h-5 text-zinc-950" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <p className="text-center text-zinc-500 font-mono mt-8">
            © {new Date().getFullYear()} Flashcards AI. All Rights Reserved.
        </p>
      </div>
    </footer>
    </>
  );
}
