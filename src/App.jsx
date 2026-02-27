import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import Header from './components/Header';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow w-full max-w-7xl px-4 py-8">
        <Routes>
          <Route path="/" element={<LandingPage searchQuery={searchQuery} />} />
          <Route path="/module/:id" element={<ModuleDetailPage />} />
        </Routes>
      </main>
      <footer className="w-full bg-[#333333] text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Helse Sør-Øst Nano-learning Portal</p>
      </footer>
    </div>
  );
}

export default App;
