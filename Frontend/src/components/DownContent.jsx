import React from 'react';
import { useNavigate } from 'react-router-dom';
import bloodDonationImage from '../assets/Person.jpeg';

const DownContent = () => {
  const navigate = useNavigate();

  // Blood type compatibility data
  const bloodTypes = [
    { type: 'A+', donateTo: ['A+', 'AB+'], receiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    { type: 'A-', donateTo: ['A+', 'A-', 'AB+', 'AB-'], receiveFrom: ['A-', 'O-'] },
    { type: 'B+', donateTo: ['B+', 'AB+'], receiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    { type: 'B-', donateTo: ['B+', 'B-', 'AB+', 'AB-'], receiveFrom: ['B-', 'O-'] },
    { type: 'AB+', donateTo: ['AB+'], receiveFrom: ['All Types'] },
    { type: 'AB-', donateTo: ['AB+', 'AB-'], receiveFrom: ['AB-', 'A-', 'B-', 'O-'] },
    { type: 'O+', donateTo: ['A+', 'B+', 'AB+', 'O+'], receiveFrom: ['O+', 'O-'] },
    { type: 'O-', donateTo: ['All Types'], receiveFrom: ['O-'] }
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-8 shadow-lg my-12">
      {/* Main Heading */}
      <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
        Learn About Donation
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Impact Statement */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              <span className="text-red-600">One</span> Blood Donation Can Save Up To{' '}
              <span className="text-red-600">Three</span> Lives
            </h3>
            <p className="text-gray-700">
              Your single donation can be separated into red cells, plasma, and platelets,
              potentially helping multiple patients in need.
            </p>
          </div>

          {/* Three Same Images in a Row */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-2 rounded-lg shadow-sm flex-1 hover:shadow-md transition-all duration-200">
                <img
                  src={bloodDonationImage}
                  alt={`Blood donation benefit ${item}`}
                  className="w-full h-32 md:h-40 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Donate Now Button */}
          <div className="text-center">
            <button 
              onClick={() => 
                navigate('/donate')}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Donate Now
            </button>
          </div>
        </div>

        {/* Right Side - Blood Type Table */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Compatible Blood Type Donors
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-bold text-black border-b">Blood Type</th>
                    <th className="py-3 px-4 text-left font-bold text-black border-b">Donate Blood To</th>
                    <th className="py-3 px-4 text-left font-bold text-black border-b">Receive Blood From</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodTypes.map((blood, index) => (
                    <tr key={blood.type} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-bold border-b">
                        <span className="text-red-700 bg-red-50 px-2 py-1 rounded">
                          {blood.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b text-gray-700">
                        {blood.donateTo.join(', ')}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-700">
                        {blood.receiveFrom.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownContent;