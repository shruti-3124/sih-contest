import React, { useState } from 'react';

const Leaderboard = ({ score }) => {
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  const handleSubmit = () => {
    const newEntry = { name, score };
    setLeaderboard([...leaderboard, newEntry].sort((a, b) => b.score - a.score));
    setName('');
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Score</button>

      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
