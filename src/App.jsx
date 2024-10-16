import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [list, setList] = useState(null);

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);

  const fetchAllCoinData = async () => {
    let query = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`;

    const response = await fetch(query);
    const json = await response.json();
    setList(json);
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list && Object.entries(list.Data).map(([coin]) => 
          list.Data[coin].PlatformType === "blockchain" ? (
            <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default App;
