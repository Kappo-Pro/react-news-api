import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <div style={{ backgroundImage: "url('https://png.pngtree.com/background/20230512/original/pngtree-female-woman-reading-a-newspaper-on-a-table-picture-image_2503498.jpg')", height: '100vh', width: 'auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: "yellow" }}>All News Data in one Place</h1>
        <div style={{ color: "white" }}>
          <h3> - Structured, Clean, Aggregated in real time</h3>
          <h3> - Find news articles by any topic, country, language, category or keyword</h3>
        </div>
        <button style={{ marginRight: 200 }} className='btn btn-primary' onClick={() => navigate('news-api')}>NEWS API</button>
        <button style={{ marginLeft: 200 }} className='btn btn-primary' onClick={() => navigate('g-news')}>GNEWS</button>
      </div>
    </div>
  )
}

export default App