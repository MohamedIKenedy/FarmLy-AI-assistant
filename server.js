import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import bodyParser from 'body-parser'; // Use import instead of require


const PORT = process.env.EXPRESS_PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const upload = multer({ dest: 'uploads/' }).array('images', 10);

const app = express();
app.use(cors());
app.use(express.json());




app.use(bodyParser.json());

app.get('/config', (req, res) => {
  const configPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json(config);
  } else {
    res.json({});
  }
});

app.post('/config', (req, res) => {
  const configPath = path.join(__dirname, 'config.json');
  console.log('Received POST request with body:', req.body); // Log the request body
  try {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    console.log('Config saved to', configPath); // Log the file path
    res.sendStatus(200);
  } catch (error) {
    console.error('Error writing to config.json:', error);
    res.sendStatus(500);
  }
});


// Serve static files from the public directory
app.use(express.static('public'));

app.post('/predict', (req, res) => {
  const inputData = JSON.stringify(req.body);

  // Escape quotes in the JSON string
  const escapedInputData = inputData.replace(/"/g, '\\"');

  // Run the Python script with input data as argument
  exec(`python3 predict_crop.py "${escapedInputData}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Prediction failed' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error in Python script' });
    }
    console.log(`Prediction result: ${stdout}`);

    res.json({ recommendation: stdout.trim() });
  });
});

app.post('/dairy', (req, res) => {
  const inputData = JSON.stringify(req.body);

  // Escape quotes in the JSON string
  const escapedInputData = inputData.replace(/"/g, '\\"');

  // Run the Python script with input data as argument
  exec(`python3 predict_dairy.py "${escapedInputData}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Prediction failed' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error in Python script' });
    }
    console.log(`Prediction result: ${stdout}`);

    res.json({ quality: stdout.trim() });
  });
});



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));