# URL Shortener Microservice
The microservice that shortens URLs to numeric IDs and redirects requests to the original URL. Built as part of freeCodeCamp Back End Development and APIs curriculum.

📚 [Course Link](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

📃 This project stores URL mapping in a JSON file (simple local storage) and exposes a minimal API to create and access shortened URLs.

## Overview
- Accepts URL follow `http(s)://www.example.com` format
- Return a `original_url` and `short_url` numeric correspond to original URL
- Visiting `api/shorturl/<short_url>` redirects to the original URL

## Features
- Validates URLs and return `{ error: 'invalid url'}` for invalid input
- Store mappings (original URL <-> numeric short URL) in a JSON file
- Redirects to the original URL when accessing the short numeric URL

## Requirements
- Node.js >= 22 (tested with Node 22)
- express
- dotenv (loads environment variables)
- cors
- body-parser or `express.urlencoded()` (gets data from payload)

  Note: freeCodeCamp tests POST requests as form data (`application/x-www-form-urlencoded`). Make sure your server uses `express.urlencoded({ extended: false })` or equivalent.

## Quick Start
```bash
# Clone repository
git clone https://github.com/HGiang01/url-shortener-microservice
cd url-shortener-microservice

# Install dependencies
npm install 

# Create data.json to store short URLs
touch data.json

# Start server
npm run start

# The app listens on PORT (default: 3000)
# Visit http://localhost:3000
```

## Configuration
- `PORT`: Port the HTTP server listens on (default: 3000)
- See `sample.env` for an example value. Note: environment variables must be provided by your shell or process manager; no `.env` loader is bundled

## API Usage
### Create a short URL
`POST /api/shorturl`

Content-Type: `application/x-www-form-urlencoded`

Body field: `url`
- Success:
  ```json
  {
    "original_url": "https://freeCodeCamp.org",
    "short_url": 1,
  }
  ```
- Failed: If your url is invalid
  ```json
  {
    "error": "invalid url",
  }
  ```

### Redirect with short URL
`GET /api/shorturl/<shorturl>`

If `<short_url>` exists, responds with a redirect (HTTP 302) to original URL

## License
MIT