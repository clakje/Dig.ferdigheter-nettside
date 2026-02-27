import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import mockData from '../data/mockData.json';

const ModuleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the current module
    const module = mockData.find(m => m.id === id);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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
        <div className="w-full max-w-5xl mx-auto pb-12">
            <Link to="/" className="inline-flex items-center text-[#0056a4] hover:text-blue-800 font-medium mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tilbake til oversikten
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                <div className="bg-[#e6f0f9] px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b-4 border-[#0056a4]">
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold text-[#0056a4] mb-4">{module.title}</h1>
                        <p className="text-lg text-gray-700 font-medium max-w-2xl">{module.shortDescription}</p>
                    </div>
                    <div className="hidden md:flex ml-8 bg-white p-4 rounded-full shadow-sm">
                        <BookOpen className="w-16 h-16 text-[#0056a4]" />
                    </div>
                </div>

                <div className="p-8 md:p-12 prose prose-lg prose-blue max-w-none text-gray-800">
                    {/* Format the full content using basic whitespace rules if HTML tags aren't present */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {module.fullContent}
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
        </div>
    );
};

export default ModuleDetailPage;
