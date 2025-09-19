// Import required modules
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import path, { dirname } from 'path';
import express from 'express';
import cors from 'cors';
import * as fs from 'fs/promises';
import dns from 'dns';

// Configure and init app
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();

// Setup middlewares
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Define routers
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req, res) => {
  try {
    const url = new URL(req.body.url);
    const protocolRegex = /^https?:$/;
    // Check protocol format
    if (!protocolRegex.test(url.protocol)) {
      throw new Error('invalid url');
    };
    
    // Check for url existence
    dns.lookup(url.hostname, (error) => {
      if (error) {
        throw new Error('invalid url');
      };
    });

    // Init url object
    let data = {
      original_url: url.href,
      short_url: 0,
    };

    // Get list of url
    let urlList = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8');

    // First url
    if (!urlList) {
      await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify([data]), 'utf-8');
      return res.json(data);
    };

    urlList = JSON.parse(urlList);

    // Handle duplicate url
    const isExisted = urlList.find((url) => url['original_url'] == data['original_url']);
    if (isExisted) {
      return res.json(isExisted);
    };

    // Push url into list and write it into JSON file
    data.short_url = urlList.length;
    urlList.push(data);
    await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(urlList), 'utf-8');

    return res.json(data);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// Start sever
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
