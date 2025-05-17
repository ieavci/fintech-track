import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    socket.on('stock-data', data => {
      setStocks(data);
    });

    return () => socket.off('stock-data');
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Borsa Takip (Web)</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sembol</th>
            <th>Fiyat ($)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
