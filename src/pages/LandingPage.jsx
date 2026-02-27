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
        <div className="w-full">
            <div className="mb-10 mt-6 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-[#0056a4] tracking-tight sm:text-4xl mb-4">
                    Velkommen til din læringsportal
                </h2>
                <p className="text-lg text-gray-600">
                    Finn og gjennomfør korte, praktiske moduler for å styrke din digitale kompetanse i hverdagen.
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
