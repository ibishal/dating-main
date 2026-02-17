import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Confessions from './pages/Confessions';
import PoolDetail from './pages/PoolDetail';
import Matching from './pages/Matching';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import DataSovereignty from './pages/DataSovereignty';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/confessions" element={<Confessions />} />
          <Route path="/pool/:poolId" element={<PoolDetail />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/data" element={<DataSovereignty />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;