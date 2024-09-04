import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import GameSelection from './components/games';
import Leaderboard from './components/leaderboard';
import UserEntry from './components/userEntry';
import UserPicks from './components/userPicks';  // Import the UserPicks component

const getCurrentWeek = () => {
  // Change this date to simulate time passing
  const startOfSeason = new Date('2024-09-05'); // Set this to 7 days before the original start date
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - startOfSeason.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  let week = Math.floor(diffInDays / 7) + 1;

  if (diffInDays < 0) {
    week = 1;
  }

  return week > 18 ? 18 : week;
};

function App() {
  const currentWeek = getCurrentWeek();
  const [twitterHandle, setTwitterHandle] = useState('');

  const handleTwitterHandleSubmit = (handle) => {
    setTwitterHandle(handle);
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col">
        <Routes>
          <Route
            path="/submit-picks"
            element={
              <GameSelection week={currentWeek} twitterHandle={twitterHandle} onTwitterHandleSubmit={handleTwitterHandleSubmit} />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/games"
            element={
              twitterHandle ? (
                <UserPicks twitterHandle={twitterHandle} />
              ) : (
                <UserEntry onTwitterHandleSubmit={handleTwitterHandleSubmit} />
              )
            }
          />
          <Route path="/" element={<GameSelection week={currentWeek} twitterHandle={twitterHandle} onTwitterHandleSubmit={handleTwitterHandleSubmit} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

