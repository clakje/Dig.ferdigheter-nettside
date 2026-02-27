import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import mockData from '../data/mockData.json';

const LandingPage = ({ searchQuery, bookmarks, toggleBookmark }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

    useEffect(() => {
        document.title = "Den digitale dråpen - Helse Sør-Øst";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = "Hver dråpe av kunnskap bygger din digitale kompetanse. Finn dine nano-læringsmoduler her.";
        }
    }, []);

    // Extract unique clean tags
    const allTags = useMemo(() => {
        const tags = mockData.flatMap(m => m.keywords.map(kw => kw.replace(/-\d+$/, '').replace('-', ' ')));
        return [...new Set(tags)].sort();
    }, []);

    // Filter modules based on search query, tags, and bookmarks
    const filteredModules = mockData.filter((item) => {
        const query = searchQuery.toLowerCase();
        const titleMatch = query === '' || item.title.toLowerCase().includes(query);
        const keywordMatch = query === '' || item.keywords.some((kw) => kw.toLowerCase().includes(query));
        const matchesSearch = titleMatch || keywordMatch;

        const matchesTag = !selectedTag || item.keywords.some(kw => kw.replace(/-\d+$/, '').replace('-', ' ') === selectedTag);

        const matchesBookmark = !showBookmarksOnly || bookmarks.includes(item.id);

        return matchesSearch && matchesTag && matchesBookmark;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full relative"
        >
            <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none bg-[url('/Dig.ferdigheter-nettside/draape.png')] bg-no-repeat bg-contain z-0 mt-20"></div>

            <div className="mb-8 mt-8 text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0056a4] to-[#3fa3f2] bg-clip-text text-transparent tracking-tight mb-4">
                    Mange bekker små...
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                    Hver dråpe av kunnskap bygger din digitale kompetanse. Finn dine moduler under.
                </p>
                <div className="bg-[#e6f0f9]/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-blue-100 max-w-2xl mx-auto">
                    <p className="text-[1.05rem] text-[#004280] font-medium leading-relaxed">
                        Visste du at grunnleggende digitale ferdigheter sparer deg for verdifull tid hver eneste dag?
                        Ved å mestre de smarte, små grepene får du en smidigere arbeidsflyt, mindre frustrasjon,
                        og mer rom til de oppgavene som faktisk betyr noe.
                    </p>
                </div>
            </div>

            {/* Tag and Filter Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-10 w-full max-w-4xl mx-auto">
                <button
                    onClick={() => { setSelectedTag(null); setShowBookmarksOnly(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${!selectedTag && !showBookmarksOnly ? 'bg-[#0056a4] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-[#e6f0f9]'}`}
                >
                    Alle
                </button>
                <button
                    onClick={() => { setShowBookmarksOnly(true); setSelectedTag(null); }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-300 ${showBookmarksOnly ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-red-50'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={showBookmarksOnly ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Mine Favoritter
                </button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => { setSelectedTag(tag); setShowBookmarksOnly(false); }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${selectedTag === tag ? 'bg-[#3fa3f2] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-100 hover:border-[#3fa3f2] hover:text-[#0056a4]'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {filteredModules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    {filteredModules.map((module) => (
                        <ModuleCard
                            key={module.id}
                            module={module}
                            isBookmarked={bookmarks.includes(module.id)}
                            toggleBookmark={toggleBookmark}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 relative z-10">
                    <p className="text-xl text-gray-500 font-medium">Ingen moduler funnet. Prøv et annet filter.</p>
                </div>
            )}
        </motion.div>
    );
};

export default LandingPage;
