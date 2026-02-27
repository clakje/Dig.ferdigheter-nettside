import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <header className="w-full bg-white shadow-md border-b-4 border-[#0056a4] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    {/* Logo Placeholder */}
                    <div className="w-12 h-12 bg-[#0056a4] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        HSØ
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-[#0056a4] leading-tight">Helse Sør-Øst</h1>
                        <p className="text-sm text-gray-500 font-medium">Nano-learning Portal</p>
                    </div>
                </Link>

                <div className="relative w-full max-w-md ml-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0056a4] focus:border-[#0056a4] sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Søk etter moduler, tema eller stikkord..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Søk etter læringsmoduler"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
