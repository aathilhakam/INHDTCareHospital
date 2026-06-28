import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Appointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const handleBookAppointment = (doctor) => {
    navigate('/add', { 
      state: { selectedDoctor: doctor } 
    });
  };

  const handleShowInfo = (doctor) => {
    navigate('/doctor-info', { 
      state: { doctor } 
    });
  };

  // Top 20+ Sri Lankan Doctors with Detailed Information
  const doctorsList = [
    { 
      _id: 1, 
      name: "Dr. Asela Jayakody", 
      specialty: "Cardiologist", 
      experience: "25 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Wed 9AM-5PM", position: "Senior Consultant" }
      ],
      rating: 4.9, 
      availability: "Mon-Fri",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (Cardiology), FRCP"
    },
    { 
      _id: 2, 
      name: "Dr. Prasad Wijewardene", 
      specialty: "Neurosurgeon", 
      experience: "28 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Thu 8AM-4PM", position: "Chief Neurosurgeon" }
      ],
      rating: 4.8, 
      availability: "Mon-Sat",
      hierarchy: "Chief of Department",
      qualifications: "MBBS, MS (Neurosurgery), FACS"
    },
    { 
      _id: 3, 
      name: "Dr. Anura Kumara", 
      specialty: "Orthopedic Surgeon", 
      experience: "22 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-5PM", position: "Consultant" }
      ],
      rating: 4.7, 
      availability: "Mon-Fri",
      hierarchy: "Consultant",
      qualifications: "MBBS, MS (Orthopedics), DNB"
    },
    { 
      _id: 4, 
      name: "Dr. Rohana Desai", 
      specialty: "General Physician", 
      experience: "20 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Sat 8AM-8PM", position: "Senior Physician" }
      ],
      rating: 4.8, 
      availability: "Daily",
      hierarchy: "Senior Physician",
      qualifications: "MBBS, MD (General Medicine), MRCP"
    },
    { 
      _id: 5, 
      name: "Dr. Deepal Weerasooriya", 
      specialty: "Pediatrician", 
      experience: "18 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 8AM-4PM", position: "Senior Pediatrician" }
      ],
      rating: 4.9, 
      availability: "Mon-Sat",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (Pediatrics), MRCPCH"
    },
    { 
      _id: 6, 
      name: "Dr. Jayantha Wijesinghe", 
      specialty: "Oncologist", 
      experience: "26 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Tue-Sat 9AM-5PM", position: "Chief Oncologist" }
      ],
      rating: 4.9, 
      availability: "Tue-Sat",
      hierarchy: "Chief of Department",
      qualifications: "MBBS, MD (Oncology), FRCP"
    },
    { 
      _id: 7, 
      name: "Dr. Sampath Gunarathne", 
      specialty: "Gastroenterologist", 
      experience: "24 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-4PM", position: "Consultant" }
      ],
      rating: 4.7, 
      availability: "Mon-Fri",
      hierarchy: "Consultant",
      qualifications: "MBBS, MD (Gastroenterology), FRCP"
    },
    { 
      _id: 8, 
      name: "Dr. Indika Wijetunga", 
      specialty: "Dermatologist", 
      experience: "19 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Sat 10AM-6PM", position: "Consultant Dermatologist" }
      ],
      rating: 4.8, 
      availability: "Mon-Sat",
      hierarchy: "Consultant",
      qualifications: "MBBS, MD (Dermatology), DVD"
    },
    { 
      _id: 9, 
      name: "Dr. Amara Dissanayake", 
      specialty: "Ophthalmologist", 
      experience: "21 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Daily 9AM-5PM", position: "Senior Ophthalmologist" }
      ],
      rating: 4.9, 
      availability: "Daily",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MS (Ophthalmology), FRCS"
    },
    { 
      _id: 10, 
      name: "Dr. Buddhika Jayasooriya", 
      specialty: "ENT Specialist", 
      experience: "23 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-4PM", position: "Consultant ENT" }
      ],
      rating: 4.7, 
      availability: "Mon-Fri",
      hierarchy: "Consultant",
      qualifications: "MBBS, MS (ENT), DLO"
    },
    { 
      _id: 11, 
      name: "Dr. Chandrika Dey", 
      specialty: "Gynecologist", 
      experience: "20 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Sat 8AM-4PM", position: "Senior Gynecologist" }
      ],
      rating: 4.9, 
      availability: "Mon-Sat",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (OBGYN), FRCOG"
    },
    { 
      _id: 12, 
      name: "Dr. Harsha Fernando", 
      specialty: "Urologist", 
      experience: "17 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Tue-Sat 10AM-5PM", position: "Consultant Urologist" }
      ],
      rating: 4.6, 
      availability: "Tue-Sat",
      hierarchy: "Consultant",
      qualifications: "MBBS, MS (Urology), FRCS"
    },
    { 
      _id: 13, 
      name: "Dr. Ismail Hossain", 
      specialty: "Pulmonologist", 
      experience: "25 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-4PM", position: "Senior Pulmonologist" }
      ],
      rating: 4.8, 
      availability: "Mon-Fri",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (Pulmonary Medicine), FRCP"
    },
    { 
      _id: 14, 
      name: "Dr. Kumari Mathews", 
      specialty: "Rheumatologist", 
      experience: "22 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Wed-Sat 10AM-4PM", position: "Consultant Rheumatologist" }
      ],
      rating: 4.7, 
      availability: "Wed-Sat",
      hierarchy: "Consultant",
      qualifications: "MBBS, MD (Rheumatology), FRCP"
    },
    { 
      _id: 15, 
      name: "Dr. Lakshman Silva", 
      specialty: "Endocrinologist", 
      experience: "26 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-5PM", position: "Senior Endocrinologist" }
      ],
      rating: 4.8, 
      availability: "Mon-Fri",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (Endocrinology), FRCP"
    },
    { 
      _id: 16, 
      name: "Dr. Madhavi Wijedasa", 
      specialty: "Psychiatrist", 
      experience: "20 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Tue-Sat 9AM-4PM", position: "Senior Psychiatrist" }
      ],
      rating: 4.9, 
      availability: "Tue-Sat",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MD (Psychiatry), MRCPsych"
    },
    { 
      _id: 17, 
      name: "Dr. Nimal Jayawardane", 
      specialty: "Nephrologist", 
      experience: "23 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-4PM", position: "Consultant Nephrologist" }
      ],
      rating: 4.7, 
      availability: "Mon-Fri",
      hierarchy: "Consultant",
      qualifications: "MBBS, MD (Nephrology), FRCP"
    },
    { 
      _id: 18, 
      name: "Dr. Oshada Perera", 
      specialty: "Hepatologist", 
      experience: "21 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Sat 10AM-5PM", position: "Consultant Hepatologist" }
      ],
      rating: 4.8, 
      availability: "Mon-Sat",
      hierarchy: "Consultant",
      qualifications: "MBBS, MD (Hepatology), FRCP"
    },
    { 
      _id: 19, 
      name: "Dr. Priyantha Senevirathne", 
      specialty: "Orthopedic Surgeon", 
      experience: "27 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Tue-Sat 8AM-3PM", position: "Chief Orthopedic Surgeon" }
      ],
      rating: 4.9, 
      availability: "Tue-Sat",
      hierarchy: "Chief of Department",
      qualifications: "MBBS, MS (Orthopedics), FACS"
    },
    { 
      _id: 20, 
      name: "Dr. Qasim Malik", 
      specialty: "Urologist", 
      experience: "24 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 9AM-5PM", position: "Senior Urologist" }
      ],
      rating: 4.8, 
      availability: "Mon-Fri",
      hierarchy: "Senior Consultant",
      qualifications: "MBBS, MS (Urology), FRCS"
    },
    { 
      _id: 21, 
      name: "Dr. Rasika Jayasekara", 
      specialty: "Dentist/Orthodontist", 
      experience: "19 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Daily 9AM-6PM", position: "Senior Dentist" }
      ],
      rating: 4.7, 
      availability: "Daily",
      hierarchy: "Senior Consultant",
      qualifications: "BDS, MDS (Orthodontics)"
    },
    { 
      _id: 22, 
      name: "Dr. Suresh Karunaratne", 
      specialty: "Cardiologist", 
      experience: "28 years", 
      hospitals: [
        { name: "INHDT Care Hospital", timings: "Mon-Fri 8AM-4PM", position: "Chief Cardiologist" }
      ],
      rating: 4.9, 
      availability: "Mon-Fri",
      hierarchy: "Chief of Department",
      qualifications: "MBBS, MD (Cardiology), FRCP, FACC"
    },
  ];

  const specialties = ["All", "Cardiologist", "Neurosurgeon", "Orthopedic Surgeon", "General Physician", "Pediatrician", "Oncologist", "Gastroenterologist", "Dermatologist", "Ophthalmologist", "ENT Specialist", "Gynecologist", "Psychiatrist"];

  useEffect(() => {
    setDoctors(doctorsList);
    setFilteredDoctors(doctorsList);
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (selectedSpecialty !== "All") {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }

    if (query.trim() !== "") {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [query, selectedSpecialty, doctors]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add hospital logo as centered watermark
    const logoUrl = '/INHDTLogo.png';
    doc.addImage(logoUrl, 'PNG', 55, 100, 100, 100);
    
    // Add semi-transparent white overlay for readability
    doc.setFillColor(255, 255, 255);
    doc.setGState(new doc.GState({ opacity: 0.9 }));
    doc.rect(0, 0, 210, 297, 'F');
    doc.setGState(new doc.GState({ opacity: 1.0 }));
    
    // Add hospital name at top
    doc.setTextColor(20, 184, 166);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INHDT Care Hospital', 105, 25, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Doctors List', 105, 35, { align: 'center' });
    
    // Add table with teal header and transparent body
    doc.autoTable({
      head: [["Doctor Name", "Specialty", "Experience", "Hospitals", "Rating"]],
      body: filteredDoctors.map((doctor) => [
        doctor.name,
        doctor.specialty,
        doctor.experience,
        doctor.hospitals.map(h => h.name).join(', '),
        doctor.rating,
      ]),
      theme: "grid",
      startY: 50,
      headStyles: { fillColor: [20, 184, 166], textColor: 255 },
      bodyStyles: { textColor: 50, fillColor: null },
    });
    doc.save("doctors_list.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50">
      {/* Hero Section */}
      <section
        className="relative bg-white text-gray-900 min-h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundBlendMode: "multiply"
        }}
      >
        <div className="relative z-10 text-center px-4 py-8 max-w-5xl mx-auto">
          <div className="mb-4 inline-block">
            <span className="inline-block px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold border border-teal-300 text-teal-700">Find Your Doctor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">Your Health, Our Priority</h1>
          <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">Book an appointment with our experienced doctors today</p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-4 bg-white shadow-md sticky top-0 z-40 border-b-4 border-teal-600">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🔍 Find Your Doctor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  className="w-full h-14 bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg border-2 border-gray-300 px-6 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition text-gray-800"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <svg className="absolute right-4 top-4 w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full h-14 bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg border-2 border-gray-300 px-6 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition text-gray-800 font-semibold"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full">
              ✓ Showing {filteredDoctors.length} of {doctors.length} doctors
            </div>
            <button onClick={generatePDF} className="text-teal-600 hover:text-teal-700 font-semibold text-sm transition">
              📊 Export Results
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-10 bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-3">Meet Our Expert Doctors</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">Highly qualified and experienced healthcare professionals</p>
          </div>
          
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <div key={doctor._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:transform hover:-translate-y-3 border border-gray-100 hover:border-teal-300">
                  {/* Doctor Avatar */}
                  <div className="h-44 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10 border-4 border-teal-300">
                      <span className="text-4xl font-black text-teal-600">{doctor.name.charAt(4)}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-7">
                    <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-teal-600 transition">{doctor.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-1.5 rounded-full">{doctor.specialty}</span>
                    </div>

                    <div className="space-y-3 mb-5 text-sm">
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
                        <span className="font-semibold text-gray-800">{doctor.hospitals[0]?.name || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-5 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-orange-600">{doctor.rating}/5</span>
                    </div>

                    {/* Availability */}
                    <div className="mb-5 text-xs font-bold text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg inline-block border border-green-300">
                      ✅ {doctor.availability}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => handleBookAppointment(doctor)}
                        className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg font-bold text-center hover:from-teal-700 hover:to-teal-800 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        📅 Book
                      </button>
                      <button 
                        onClick={() => handleShowInfo(doctor)}
                        className="flex-1 border-2 border-teal-600 text-teal-600 py-3 rounded-lg font-bold hover:bg-teal-50 transition duration-300 transform hover:scale-105"
                      >
                        ℹ️ Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Doctors Found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search criteria or specialty filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 border-t-4 border-teal-600">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-3">Why Choose Our Doctors</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border-t-4 border-blue-600">
              <div className="mb-6 flex justify-center">
                <div className="p-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full group-hover:scale-110 transition duration-300">
                  <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">✅ Verified Experts</h3>
              <p className="text-gray-600 leading-relaxed">All doctors are verified professionals with extensive experience and proven qualifications in their specialties</p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border-t-4 border-green-600">
              <div className="mb-6 flex justify-center">
                <div className="p-5 bg-gradient-to-br from-green-100 to-green-200 rounded-full group-hover:scale-110 transition duration-300">
                  <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition">⏱️ Easy Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">Book appointments with flexible time slots that perfectly suit your busy schedule and preferences</p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border-t-4 border-purple-600">
              <div className="mb-6 flex justify-center">
                <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full group-hover:scale-110 transition duration-300">
                  <svg className="w-10 h-10 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition">🎯 24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">Our dedicated support team is available round the clock to assist you with any queries</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Appointment;
