import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import GenerateSongs from "./songGenerator";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("video");

    if (!file) {
      throw new Error("No file uploaded");
    }

    // Use the /tmp directory for file uploads
    const UPLOAD_DIR = path.join("/tmp", "UPLOADS");
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const fileExt = path.extname(file.name).toLowerCase();
    const baseName = path
      .basename(file.name, fileExt)
      .replace(/[^\w-]/g, "")
      .substring(0, 50);
    const filename = `${Date.now()}-${baseName}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Retrieve Spotify access token using client credentials flow
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    };

    const spotifyResponse = await fetch(authOptions.url, {
      method: authOptions.method,
      headers: authOptions.headers,
      body: authOptions.body,
    });

    if (!spotifyResponse.ok) {
      throw new Error("Failed to fetch Spotify access token");
    }

    const spotifyData = await spotifyResponse.json();
    const spotifyAccessToken = spotifyData.access_token;

    console.log("Spotify Access Token:", spotifyAccessToken);

    // Pass the Spotify access token to GenerateSongs
    const result = await GenerateSongs(filePath, spotifyAccessToken);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error processing upload:", err);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
