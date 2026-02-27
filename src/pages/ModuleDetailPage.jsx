import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, BookOpen, LayoutGrid, Key, User,
    Pin, Settings, Plus, Search, Power, Accessibility, Heart
} from 'lucide-react';
import mockData from '../data/mockData.json';

const iconMap = {
    'WindowsLogo': LayoutGrid,
    'Key': Key,
    'User': User,
    'Pin': Pin,
    'Settings': Settings,
    'Add': Plus,
    'Search': Search,
    'PowerButton': Power,
    'EaseOfAccess': Accessibility,
};

const renderContentWithIcons = (text) => {
    // Split the text by the [Ikon: ...] pattern
    const parts = text.split(/(\[Ikon:\s*[a-zA-Z]+\])/g);

    return parts.map((part, index) => {
        const match = part.match(/\[Ikon:\s*([a-zA-Z]+)\]/);
        if (match) {
            const iconName = match[1];
            const IconComponent = iconMap[iconName] || BookOpen; // Fallback to BookOpen
            return (
                <span key={index} className="inline-flex items-center justify-center mx-1 align-sub text-[#0056a4] bg-[#e6f0f9] p-1 rounded-md">
                    <IconComponent className="w-5 h-5" />
                </span>
            );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
};

const ModuleDetailPage = ({ bookmarks, toggleBookmark }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the current module
    const module = mockData.find(m => m.id === id);
    const isBookmarked = bookmarks?.includes(module?.id);

    // Scroll to top on load and update SEO tags
    useEffect(() => {
        window.scrollTo(0, 0);
        if (module) {
            document.title = `${module.title} | Den digitale dråpen`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = module.shortDescription;
            }
        }
    }, [id, module]);

    if (!module) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Modulen ble ikke funnet.</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-[#0056a4] hover:underline font-medium">
                    Gå tilbake til forsiden
                </button>
            </div>
        );
    }

    // Find suggested modules based on shared keywords (excluding current module)
    const suggestedModules = mockData.filter(m => {
        if (m.id === module.id) return false;
        return m.keywords.some(kw => module.keywords.includes(kw));
    }).slice(0, 3); // Max 3 suggestions

    // If no exact keyword match, just suggest first 3 other modules
    const fallbackSuggestions = suggestedModules.length > 0
        ? suggestedModules
        : mockData.filter(m => m.id !== module.id).slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto pb-12 relative z-10"
        >
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="inline-flex items-center text-[#0056a4] hover:text-blue-800 font-medium transition-colors bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tilbake til oversikten
                </Link>
                <button
                    onClick={() => toggleBookmark(module.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors duration-300 shadow-sm border ${isBookmarked ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-gray-600 border-gray-100 hover:text-red-500 hover:bg-red-50/50 hover:border-red-100'}`}
                >
                    <Heart className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                    {isBookmarked ? "Lagt til i favoritter" : "Lagre som favoritt"}
                </button>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-blue-100 overflow-hidden mb-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none bg-[url('/Dig.ferdigheter-nettside/draape.png')] bg-no-repeat bg-contain z-0 -mt-10 -mr-10"></div>

                <div className="bg-gradient-to-r from-[#e6f0f9] to-[#f4f8fc] px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b-[3px] border-[#3fa3f2]/50 relative z-10">
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#0056a4] to-[#3fa3f2] bg-clip-text text-transparent mb-4">{module.title}</h1>
                        <p className="text-xl text-gray-700 font-medium max-w-2xl leading-relaxed">{module.shortDescription}</p>
                    </div>
                    <div className="hidden md:flex ml-8 drop-shape bg-gradient-to-br from-[#3fa3f2] to-[#0056a4] w-24 h-24 items-center justify-center shadow-inner shrink-0">
                        <div className="drop-content-fix text-white">
                            <BookOpen className="w-10 h-10" />
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 prose prose-lg prose-blue max-w-none text-gray-800 relative z-10">
                    <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                        {renderContentWithIcons(module.fullContent)}
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Foreslåtte moduler</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {fallbackSuggestions.map((suggestion) => (
                        <Link key={suggestion.id} to={`/module/${suggestion.id}`} className="block group">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transform transition duration-300 hover:shadow-md hover:border-[#0056a4]/50">
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0056a4] transition-colors line-clamp-2">
                                    {suggestion.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{suggestion.shortDescription}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ModuleDetailPage;
