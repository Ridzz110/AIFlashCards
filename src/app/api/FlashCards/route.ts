import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq();

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request for user input
    const { content } = await req.json();

    // Log the incoming content for debugging
    console.log('Received content:', content);

    // Generate text using Groq API with chat completions
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI designed to generate flashcards that help users learn, memorize, and review any given material. Your task is to extract the most important information from the provided content and transform it into a structured question-answer format suitable for flashcards. The flashcards should focus on key concepts, definitions, formulas, and essential details.

Ensure that:
- The questions are clear, concise, and challenge the user's understanding.
- The answers are accurate and provide enough detail to explain the concept without overwhelming the user keep the answer brief and concise.
- When appropriate, include examples or scenarios in the answers for better understanding.
- Organize the flashcards to cover the material thoroughly, dividing complex topics into multiple cards if necessary.
- There should be at least 5 cards generated.
- You must return the flashcards in the following 'JSON' format:
{
  "flashcards": 
    {
      "question": "Question text",
      "answer": "Answer text"
    }
}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gemma2-9b-it",  // Adjust model name based on availability
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    // Log the raw response for debugging
    console.log('Raw response:', response);

    const rawContent = response.choices[0]?.message?.content || '';
    console.log('Raw content:', rawContent);

    const cleanedContent = rawContent
      .replace(/```json/g, '')  // Remove start of code block
      .replace(/```/g, '')      // Remove end of code block
      .trim();                  // Remove any leading or trailing whitespace

  // Log cleaned content for debugging
  console.log('Cleaned content:', cleanedContent);

  // Parse the cleaned JSON response
  let responseData;
  console.log('Raw response:', rawContent);

try {
  // Extract the JSON part of the response
  const jsonStartIndex = rawContent.indexOf('{');
  const jsonEndIndex = rawContent.lastIndexOf('}') + 1;
  const jsonString = rawContent.substring(jsonStartIndex, jsonEndIndex);

  // Parse the JSON string
  const parsedResponse = JSON.parse(jsonString);

  // Log the parsed response for debugging
  console.log('Parsed response:', parsedResponse);
  return NextResponse.json(parsedResponse);


  // Continue processing the parsed response
} catch (error) {
  console.error('Error parsing JSON response:', error);
}

  // Return the parsed JSON response
  
} catch (error) {
  console.error("Error generating flashcards:", error);
  return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
}
}