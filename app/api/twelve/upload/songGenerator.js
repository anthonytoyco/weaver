import videoAnalyzer from "./videoAnalyzer.js";
import { GoogleGenAI } from "@google/genai";

import { configDotenv } from "dotenv";
import { access } from "fs";

configDotenv();

const ai = new GoogleGenAI({});

async function GenerateSongs(filePath) {
  const response = await videoAnalyzer(filePath)

  let prompt1 = "Using theme the themes of";
  let prompt2 = "Generate ONLY an array of 10 objects containing a song title and artist property in valid JSON format, where each element is an object with a tile and artist property. Example: [{\"title\": \"123abc\", \"artist\": \"123abc\"}, {\"title\": \"123abc\", \"artist\": \"123abc\"}]";

  for (let i = 0; i < response.Hashtags.length; i++) {
    prompt1 += " " + response.Hashtags[i];
  }

  let fullPrompt = prompt1 + prompt2;

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });

  const tracks = await JSON.parse(geminiResponse.text.replace(/^```json|```$/g, '').trim())
  let spotifyUrl = "https://api.spotify.com/v1/tracks?ids=";

  tracks.forEach(song => {
    spotifyUrl += song.track + ","
  });

  console.log(spotifyUrl);
  let accessToken = 'BQBfo_PUp1kNLRfgZidYB6gdi7wT6JqkG16dljA3yZQoe2J-Ou7YXmJm_hdNbopi4g5FyAEqcEbxcZGGCl64g2wCvvDwt1cvaV7vwSIf7OrYhm9fndaCqTYjGl5p6NP9GIqPdliQ-xM';
  try {
    const spotifyResponse = await fetch(spotifyUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}` }
    });
    const data = await spotifyResponse.json();
    console.log(data);
  } catch (err) {
    console.log(err)
  }

  return { test: "test" };
}

export default GenerateSongs;
