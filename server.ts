import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Serve static assets from Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for deployment monitoring
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Sadekul Agro Bangla', timestamp: new Date().toISOString() });
});

// SPA fallback: serve index.html for all other routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sadekul Agro Bangla server listening on http://0.0.0.0:${PORT}`);
});
