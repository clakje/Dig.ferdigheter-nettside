import React from 'react';
import ModuleCard from '../components/ModuleCard';
import mockData from '../data/mockData.json';

const LandingPage = ({ searchQuery }) => {
    // Filter modules based on search query
    const filteredModules = mockData.filter((item) => {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(query));
        return titleMatch || keywordMatch;
    });

    return (
        <div className="w-full relative">
            <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none bg-[url('/Dig.ferdigheter-nettside/draape.png')] bg-no-repeat bg-contain z-0 mt-20"></div>

            <div className="mb-12 mt-8 text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0056a4] to-[#3fa3f2] bg-clip-text text-transparent tracking-tight mb-4">
                    Mange bekker små...
                </h2>
                <p className="text-xl text-gray-600">
                    Hver dråpe av kunnskap bygger din digitale kompetanse. Finn dine moduler under.
                </p>
            </div>

            {filteredModules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredModules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500 font-medium">Ingen moduler funnet for "{searchQuery}". Prøv et annet søkeord.</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
