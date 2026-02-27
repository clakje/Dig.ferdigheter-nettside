import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import Header from './components/Header';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Bookmarks state synced with localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('hso-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hso-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gradient-to-b from-[#f4f8fc] to-[#e1effa]">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow w-full max-w-7xl px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage searchQuery={searchQuery} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
            <Route path="/module/:id" element={<ModuleDetailPage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="w-full bg-[#333333] text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Helse Sør-Øst Nano-learning Portal</p>
      </footer>
    </div>
  );
}

export default App;
