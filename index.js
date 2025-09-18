// Import required modules
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import path, { dirname } from 'path';
import express from 'express';
import cors from 'cors';
import dns from 'dns';

// Configure and init app
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();

// Setup middlewares
app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Define routers
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Start sever
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
