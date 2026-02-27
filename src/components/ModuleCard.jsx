import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const ModuleCard = ({ module }) => {
    return (
        <Link to={`/module/${module.id}`} className="block group">
            <div
                className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                aria-label={`Gå til modul: ${module.title}`}
            >
                <div className="h-32 bg-[#e6f0f9] flex items-center justify-center p-6">
                    <BookOpen className="w-12 h-12 text-[#0056a4]" />
                </div>

                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-[#0056a4] transition-colors">
                        {module.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {module.keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f4f4f4] text-gray-800"
                            >
                                {keyword.replace(/-\d+$/, '').replace('-', ' ')}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm px-5 py-4 border-t border-gray-100 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex flex-col justify-center min-h-[50%]">
                    <p className="text-sm text-gray-700 font-medium mb-1">Dette lærer du:</p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {module.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center text-[#0056a4] text-sm font-bold">
                        Start modulen <span className="ml-1">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ModuleCard;
