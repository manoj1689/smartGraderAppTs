import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root route to serve a simple message
app.get('/', (req, res) => {
    res.send('Welcome to the API. Navigate to /data to see the JSON data.');
});

// Endpoint to serve JSON data
app.get('/data', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const data = await fs.readFile(dataPath, 'utf8');
        res.header("Content-Type", 'application/json');
        res.send(JSON.parse(data));
    } catch (err) {
        console.error('Error reading data.json:', err);
        res.status(500).send('Error reading data.json');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


