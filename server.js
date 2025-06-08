const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Load environment variables
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Initialize Genkit for AI functionality
async function initializeGenkit() {
  try {
    console.log('Initializing Genkit AI...');
    
    // Import and configure Genkit
    const { genkit } = await import('genkit');
    const { googleAI } = await import('@genkit-ai/googleai');
    
    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY not found in environment variables');
      console.warn('   AI Assistant will not function properly');
      return null;
    }
    
    // Configure Genkit with Google AI
    const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.0-flash',
    });
    
    console.log('✅ Genkit AI initialized successfully');
    return ai;
  } catch (error) {
    console.error('❌ Failed to initialize Genkit:', error.message);
    console.warn('   AI Assistant will not be available');
    return null;
  }
}

// Start the server
app.prepare().then(async () => {
  // Initialize Genkit AI
  const ai = await initializeGenkit();
  
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      
      // Handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
  .listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://${hostname}:${port}`);
    console.log(`📊 Admin Dashboard: http://${hostname}:${port}/admin/login`);
    
    if (process.env.GEMINI_API_KEY) {
      console.log(`🤖 AI Assistant: Enabled`);
    } else {
      console.log(`🤖 AI Assistant: Disabled (missing GEMINI_API_KEY)`);
    }
    
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});