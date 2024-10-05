const express = require('express');
const router = express.Router();
const multer = require('multer');
const { spawn } = require('child_process');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for evaluating stance
router.post('/evaluate-stance', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  // Call Python script for stance evaluation
  const pythonProcess = spawn('python3', ['../scripts/evaluate_stance.py']);  // Adjust path as needed
  
  // Send the image data to Python process
  pythonProcess.stdin.write(req.file.buffer);
  pythonProcess.stdin.end();

  // Collect output from the Python process
  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString();
    res.json({ result });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    res.status(500).send('Error processing image.');
  });
});

module.exports = router;
