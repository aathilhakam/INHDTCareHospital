import React from 'react';
import bloodDonationImage from '../assets/UpContent.jpeg'; // Adjust path to your image

const UpContent = () => {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-white rounded-[15px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg my-8">
      
      {/* Left Side - Text Content */}
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-black">Give the Gift of Life</h2>
        <h3 className="text-2xl font-extrabold text-red-600">Donate Blood Today!</h3>
        <p className="text-lg text-gray-800 leading-relaxed">
          Give the gift of life by donating blood.<br />
          Your simple act can save a life and make a world of difference.
        </p>
        <button 
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md 
                     hover:bg-red-700 hover:scale-105 
                     transition-all duration-300 ease-in-out"
        >
          Donate Today!!!
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 flex justify-center">
        <img 
          src={bloodDonationImage} 
          alt="Blood donation illustration"
          className="max-h-64 rounded-lg object-contain"
        />
      </div>
    </div>
  );
};

export default UpContent;