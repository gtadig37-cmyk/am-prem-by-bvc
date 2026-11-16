const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const BASE = 'https://alightmotionpremium.zone.id';
const client = axios.create({
  baseURL: BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  }
});

// 1. Generate Temp Email
app.get('/api/email/generate', async (req, res) => {
  try {
    const { data } = await client.get('/api/email/generate');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data?.message || e.message });
  }
});

// 2. Send Magic Link
app.post('/api/send-link', async (req, res) => {
  try {
    const { email } = req.body;
    const { data } = await client.post('/api/send-link', { email });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data?.message || e.message });
  }
});

// 3. Verify Magic Link
app.post('/api/verify-link', async (req, res) => {
  try {
    const { email, magicLink } = req.body;
    const { data } = await client.post('/api/verify-link', { email, magicLink });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data?.message || e.message });
  }
});

// 4. Get Stats
app.get('/api/stats', async (req, res) => {
  try {
    const { data } = await client.get('/api/stats');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data?.message || e.message });
  }
});

module.exports = app;
