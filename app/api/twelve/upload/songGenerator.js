import videoAnalyzer from "./videoAnalyzer.js";
import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";

configDotenv();

const ai = new GoogleGenAI({});

async function GenerateSongs(filePath, auth0AccessToken) {
  console.log("Starting GenerateSongs function...");
  console.log("File path:", filePath);

  const response = await videoAnalyzer(filePath);
  console.log("Video analyzer response:", response);

  let prompt1 = "Using theme the themes of";
  let prompt2 =
    'Generate ONLY an array of 10 objects containing a song title and artist property in valid JSON format, where each element is an object with a title and artist property. Example: [{"title": "123abc", "artist": "123abc"}, {"title": "123abc", "artist": "123abc"}]';

  for (let i = 0; i < response.Hashtags.length; i++) {
    prompt1 += " " + response.Hashtags[i];
  }

  let fullPrompt = prompt1 + prompt2;
  console.log("Generated prompt for Gemini:", fullPrompt);

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });
  console.log("Gemini response:", geminiResponse);

  const tracks = await JSON.parse(
    geminiResponse.text.replace(/^```json|```$/g, "").trim()
  );
  console.log("Parsed tracks from Gemini response:", tracks);

  let spotifyUrl = "https://api.spotify.com/v1/search?q=";

  const songDetails = [];
  const spotifyUrls = [];

  for (const song of tracks) {
    const query = encodeURIComponent(`${song.title} ${song.artist}`);
    const searchUrl = `${spotifyUrl}${query}&type=track&limit=1`;

    try {
      const spotifyResponse = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      });

      if (spotifyResponse.ok) {
        const data = await spotifyResponse.json();

        if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          songDetails.push(track);
          spotifyUrls.push(track.external_urls.spotify); // Collect external Spotify URL
          console.log("Spotify external URL:", track.external_urls.spotify);
        }
      } else {
        console.error(
          `Spotify API error for song: ${song.title} by ${song.artist}`,
          spotifyResponse.statusText
        );
      }
    } catch (err) {
      console.error(
        `Error fetching song: ${song.title} by ${song.artist}`,
        err
      );
    }
  }

  console.log("Final Spotify URLs:", spotifyUrls); // Log the list of Spotify URLs
  console.log("Final song details:", songDetails);
  return { songDetails, spotifyUrls };
}

export default GenerateSongs;
