import videoAnalyzer from "./videoAnalyzer.js"
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function GenerateSongs(filePath) {
  const response = await videoAnalyzer(filePath)
  console.log(response)
  return({test: test})
}

export default GenerateSongs