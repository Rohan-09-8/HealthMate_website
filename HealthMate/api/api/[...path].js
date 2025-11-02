// Vercel serverless function - catch-all route handler
// This file handles all /api/* routes as serverless functions

import app from '../index.js';

export default async function handler(req, res) {
  // Vercel serverless functions receive requests here
  // We pass them to our Express app
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}