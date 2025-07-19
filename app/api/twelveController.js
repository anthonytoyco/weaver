import { TwelveLabs } from "twelvelabs-js";
import path from "path";
import dotenv from "dotenv";

// Load environment variables at the top of the file
dotenv.config();

async function processVideo(req, res) {
  const apiKey = process.env.TWELVE_LABS_API_KEY;
  const indexKey = process.env.TWELVE_LABS_INDEX_ID;

  // 1. Initialize the client
  const client = new TwelveLabs({ apiKey });

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  const retrievedIndex = await client.index.retrieve(indexKey);
  console.log(`ID: ${retrievedIndex.id}`);
  console.log(`Name: ${retrievedIndex.name}`);
  console.log("Models:");
  retrievedIndex.models.forEach((model, index) => {
    console.log(`  Model ${index + 1}:`);
    console.log(`    Name: ${model.name}`);
    console.log(`    Options: ${JSON.stringify(model.options)}`);
  });
  console.log(`Video count: ${retrievedIndex.videoCount}`);
  console.log(`Total turation: ${retrievedIndex.totalDuration} seconds`);
  console.log(`Created at: ${retrievedIndex.createdAt}`);
  if (retrievedIndex.updatedAt) {
    console.log(`Updated at: ${retrievedIndex.updatedAt}`);
  }

  // 3. Upload a video
  const videoFilePath = path.join(__dirname, "test.mp4"); // Replace with your video file path

  const task = await client.task.create({
    indexId: retrievedIndex.id,
    file: videoFilePath, // Use the correct 'file' parameter
  });
  console.log(`Task id=${task.id} Video id=${task.videoId}`);

  // 4. Monitor the indexing process
  await task.waitForDone(5000, (task) => {
    console.log(`  Status=${task.status}`);
  });
  if (task.status !== "ready") {
    throw new Error(`Indexing failed with status ${task.status}`);
  }
  console.log(`The unique identifier of your video is ${task.videoId}`);

  // 5. Generate title, topics, and hashtags
  const gist = await client.gist(task.videoId, ["title", "topic", "hashtag"]);

  // 6. Process the results
  const answer = {
    Title: gist.title,
    Topics: gist.topics,
    Hashtags: gist.hashtags,
  };
  res.send(answer);
}

export { processVideo as sendVideo };

processVideo();
