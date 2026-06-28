import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const DoctorInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Doctor Selected</h2>
          <button 
            onClick={() => navigate('/appointment')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/appointment')}
              className="text-white hover:text-gray-200 transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Doctor Information</h1>
              <p className="text-xl text-blue-100">Detailed information about {doctor.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-600">Doctor Summary</h3>
                <div className="w-full h-40 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-300">
                    <span className="text-4xl font-black text-teal-600">{doctor.name.charAt(4)}</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-teal-600 mb-2">{doctor.name}</h4>
                <p className="text-lg font-semibold text-gray-800 mb-4">{doctor.specialty}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-gray-800">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                    </svg>
                    <span className="font-semibold text-gray-800">{doctor.hierarchy}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Rating</p>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-yellow-500">{doctor.rating}</span>
                      <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold">Hospitals</p>
                    <p className="font-semibold text-green-600 text-sm">{doctor.hospitals.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-teal-50 rounded-lg border-2 border-teal-300">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                    </svg>
                    <span className="font-semibold text-teal-800">Hospital</span>
                  </div>
                  <p className="text-sm text-gray-700">{doctor.hospitals[0]?.name}</p>
                  <p className="text-sm text-teal-600 font-medium">{doctor.hospitals[0]?.position}</p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Basic Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-teal-50 p-6 rounded-lg border-2 border-teal-200">
                  <p className="text-sm text-teal-600 font-semibold mb-2">Experience</p>
                  <p className="text-2xl font-bold text-teal-800">{doctor.experience}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                  <p className="text-sm text-yellow-600 font-semibold mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-yellow-700">{doctor.rating}</span>
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-green-600 font-semibold mb-2">Hierarchy</p>
                  <p className="text-2xl font-bold text-green-800">{doctor.hierarchy}</p>
                </div>
              </div>

              {/* Qualifications */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-600">Qualifications</h3>
                <p className="text-gray-700 text-lg">{doctor.qualifications}</p>
              </div>

              {/* Hospitals & Timings */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-teal-600">Hospitals & Timings</h3>
                <div className="space-y-4">
                  {doctor.hospitals.map((hospital, index) => (
                    <div key={index} className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-200 rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                            </svg>
                            <h4 className="text-xl font-bold text-gray-800">{hospital.name}</h4>
                          </div>
                          <div className="ml-9 space-y-2">
                            <p className="text-gray-700">
                              <span className="font-semibold text-teal-600">Position:</span> {hospital.position}
                            </p>
                            {hospital.timings && (
                              <p className="text-gray-700">
                                <span className="font-semibold text-teal-600">Timings:</span> {hospital.timings}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/appointment')}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  ← Back to Doctors
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorInfo;
