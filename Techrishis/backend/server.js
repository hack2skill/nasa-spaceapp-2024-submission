const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const fsPromises = fs.promises;

const app = express();

// Middleware
app.use(cors());
app.use(express.static('output_videos')); // Serve processed videos from the output_videos directory

// Ensure the directories exist
const ensureDirectoryExists = async (dir) => {
  try {
    await fsPromises.access(dir);
  } catch (error) {
    await fsPromises.mkdir(dir, { recursive: true });
  }
};

ensureDirectoryExists('input_videos');
ensureDirectoryExists('output_videos');

// Configure multer to handle video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'input_videos'); // Directory to save uploaded videos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save video with the original name
  },
});

const upload = multer({ storage: storage });

// Promisified exec for easier async/await usage
const execAsync = promisify(exec);

// POST route to handle video upload and processing
app.post('/api/evaluate-video', upload.single('video'), async (req, res) => {
  const inputVideoPath = `input_videos/${req.file.filename}`; // Use the uploaded filename
  const outputVideoPath = `output_videos/output_video.avi`; // Maintain naming consistency

  console.log(`Processing video: ${inputVideoPath}`);

  try {
    // Execute the Python script with the input and output paths
    const { stdout, stderr } = await execAsync(`python main.py ${inputVideoPath} ${outputVideoPath}`);
    console.log(`Python stdout: ${stdout}`);
    if (stderr) {
      console.error(`Python stderr: ${stderr}`);
    }

    // Check if output file exists
    await fsPromises.access(outputVideoPath, fs.constants.F_OK);

    console.log(`Processed video successfully: ${outputVideoPath}`);

    // Send back the path to the processed video
    res.json({ processedVideoPath: outputVideoPath });

  } catch (error) {
    console.error(`Error processing video: ${error.message || error}`);
    res.status(500).json({ error: 'Video processing failed' });
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
