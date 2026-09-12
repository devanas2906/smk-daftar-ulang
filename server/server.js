const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { MulterError } = require('multer');

const apiRouters = require('./routes/index.js');
const { connectDatabase } = require('./config/db.js');
const { nocacheHTML } = require('./utilities/nocache-html.js');
const { handleMulterError } = require('./utilities/error/multer-error.js');

const { cleanupRejectedAccounts } = require('./jobs/cleanup-rejected-accounts.job.js');

const app = express();
const port = process.env.PORT || 5000;
const distFolderPath = path.resolve(__dirname, '../dist');

// Trust first proxy (e.g., Nginx, Heroku, Cloudflare) to get correct client IP and protocol
app.set('trust proxy', 1);

// Parse JSON client request
app.use(express.json({ limit: '10mb' }));

// Error Handling file with extension .hthml
app.use((req, res, next) => {
  const urlPath = req.path;

  if (urlPath.endsWith('.html')) {
    const cleanUrl = urlPath.split('.html')[0];
    return res.redirect(301, cleanUrl);
  };

  next();
});

// Serve static client build
app.use(nocacheHTML, express.static(distFolderPath, { extensions: ["html"] }));

// API routes
app.use('/api', apiRouters);

// Route redirect to login page
app.get('/', (_, res) => res.redirect('/login'));

// 404 API Error Handling
app.use('/api/*', (_, res) => {
  res.status(404).json({ success: false, message: 'Endpoint API tidak ditemukan.' });
});

// 404 Error Handling
app.use('/', (_, res) => {
  res.sendFile(`${distFolderPath}/404.html`);
});

// Generic API error handler
app.use((err, req, res, next) => {
  const errorMessage = err.message || 'Terjadi kesalahan pada server.';
  const errorStatusCode = err.statusCode || 500;

  console.error(err);

  if (err instanceof MulterError) return handleMulterError(err, res);

  res.status(errorStatusCode).json({ success: false, message: errorMessage });
});

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.info(`The server is running on port ${port}.`);

    // Start cleanupRejectedAccounts cron job
    cleanupRejectedAccounts();
  });
};
startServer();
