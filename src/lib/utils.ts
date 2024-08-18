import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//meYdjKvxzuZR3p0b passwrd

//mongodb+srv://ridzzali110:meYdjKvxzuZR3p0b@cluster0.m65gi.mongodb.net/stripe_db?retryWrites=true&w=majority&appName=Cluster0