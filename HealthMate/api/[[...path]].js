// This file handles all API routes in Vercel
import app from './server.js';

export default function handler(req, res) {
  return app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
