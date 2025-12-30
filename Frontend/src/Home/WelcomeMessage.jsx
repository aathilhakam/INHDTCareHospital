import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative medical cross in the background */}
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/2 -translate-y-1/2">
        <svg className="h-64 w-64 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Welcome to <span className="text-blue-600">INHDT Care Hospital</span>
            <br /><br />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;