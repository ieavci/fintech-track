const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

let stocks = [
  { symbol: 'AAPL', price: 150 },
  { symbol: 'GOOGL', price: 2700 },
  { symbol: 'AMZN', price: 3400 },
];

// API route (optional)
app.get('/stocks', (req, res) => {
  res.json(stocks);
});

// Emit fake updates
setInterval(() => {
  stocks = stocks.map(stock => {
    const change = (Math.random() - 0.5) * 5;
    return { ...stock, price: +(stock.price + change).toFixed(2) };
  });
  io.emit('stock-data', stocks);
}, 2000); // 2 saniyede bir güncelle

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('stock-data', stocks);
});

server.listen(4000, () => console.log('Server running on http://localhost:4000'));
