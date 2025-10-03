const express = require('express');
const fetch = require('node-fetch');
const app = express();

const STREAM_URL = 'http://78.129.237.51:8125/';

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch(STREAM_URL, { headers: { 'Icy-MetaData': '1' } });
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', response.headers.get('content-type') || 'audio/mpeg');
    res.set('Cache-Control', 'no-cache');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Erro ao acessar o stream: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy rodando na porta ${PORT}`));
