import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const PackagesForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [suggestedDoctor, setSuggestedDoctor] = useState(null);

  const doctors = [
    { name: "Dr. Asela Jayakody", specialty: "Cardiologist", experience: "25 years", hospital: "National Hospital", rating: 4.9, availability: "Mon-Fri" },
    { name: "Dr. Prasad Wijewardene", specialty: "Neurosurgeon", experience: "28 years", hospital: "Apollo Hospitals", rating: 4.8, availability: "Mon-Sat" },
    { name: "Dr. Anura Kumara", specialty: "Orthopedic Surgeon", experience: "22 years", hospital: "Medihelp Hospital", rating: 4.7, availability: "Mon-Fri" },
    { name: "Dr. Rohana Desai", specialty: "General Physician", experience: "20 years", hospital: "Nawaloka Hospital", rating: 4.8, availability: "Daily" },
    { name: "Dr. Deepal Weerasooriya", specialty: "Pediatrician", experience: "18 years", hospital: "Lady Ridgeway Hospital", rating: 4.9, availability: "Mon-Sat" },
    { name: "Dr. Jayantha Wijesinghe", specialty: "Oncologist", experience: "26 years", hospital: "National Cancer Institute", rating: 4.9, availability: "Tue-Sat" },
    { name: "Dr. Sampath Gunarathne", specialty: "Gastroenterologist", experience: "24 years", hospital: "Sri Jayewardenepura Hospital", rating: 4.7, availability: "Mon-Fri" },
    { name: "Dr. Indika Wijetunga", specialty: "Dermatologist", experience: "19 years", hospital: "Apollo Hospitals", rating: 4.8, availability: "Mon-Sat" },
    { name: "Dr. Amara Dissanayake", specialty: "Ophthalmologist", experience: "21 years", hospital: "Eye Hospital Colombo", rating: 4.9, availability: "Daily" },
    { name: "Dr. Buddhika Jayasooriya", specialty: "ENT Specialist", experience: "23 years", hospital: "National Hospital", rating: 4.7, availability: "Mon-Fri" },
    { name: "Dr. Chandrika Dey", specialty: "Gynecologist", experience: "20 years", hospital: "Colombo South Hospital", rating: 4.9, availability: "Mon-Sat" },
    { name: "Dr. Harsha Fernando", specialty: "Urologist", experience: "17 years", hospital: "Nawaloka Hospital", rating: 4.6, availability: "Tue-Sat" },
    { name: "Dr. Ismail Hossain", specialty: "Pulmonologist", experience: "25 years", hospital: "National Hospital", rating: 4.8, availability: "Mon-Fri" },
    { name: "Dr. Lakshman Silva", specialty: "Endocrinologist", experience: "26 years", hospital: "Medihelp Hospital", rating: 4.8, availability: "Mon-Fri" },
    { name: "Dr. Madhavi Wijedasa", specialty: "Psychiatrist", experience: "20 years", hospital: "Institute of Mental Health", rating: 4.9, availability: "Tue-Sat" },
    { name: "Dr. Suresh Karunaratne", specialty: "Cardiologist", experience: "28 years", hospital: "National Hospital", rating: 4.9, availability: "Mon-Fri" },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  // Package to Doctor mapping
  const getDoctorForPackage = (packageName) => {
    const packageDoctorMap = {
      'Basic Health Check': 'Dr. Rohana Desai',
      'Diabetes Care': 'Dr. Lakshman Silva',
      'Cardiac Screening': 'Dr. Asela Jayakody',
      'Women Wellness': 'Dr. Chandrika Dey',
      'Senior Citizen': 'Dr. Rohana Desai',
      'Child Care': 'Dr. Deepal Weerasooriya',
      'Fever Package': 'Dr. Rohana Desai',
      'Post-COVID Care': 'Dr. Ismail Hossain',
      'Dental Care': 'Dr. Buddhika Jayasooriya',
      'Eye Checkup': 'Dr. Amara Dissanayake',
      'Complete Fitness': 'Dr. Rohana Desai',
      'Thyroid Check': 'Dr. Lakshman Silva'
    };
    return packageDoctorMap[packageName] || null;
  };

  useEffect(() => {
    if (selectedPackage) {
      const suggestedDocName = getDoctorForPackage(selectedPackage.name);
      if (suggestedDocName) {
        const suggestedDoc = doctors.find(d => d.name === suggestedDocName);
        setSuggestedDoctor(suggestedDoc);
        setFormData(prev => ({
          ...prev,
          doctor: suggestedDocName
        }));
      }
    }
  }, [selectedPackage]);

  const getSelectedDoctor = () => {
    return doctors.find(d => d.name === formData.doctor);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.doctor) newErrors.doctor = "Doctor selection is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time slot is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Package Booking Data:', {
        ...formData,
        package: selectedPackage
      });
      
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          patientName: '', email: '', phone: '', age: '', gender: '',
          doctor: '', date: '', time: '', notes: ''
        });
        setSubmitted(false);
        navigate('/packages');
      }, 3000);
    } catch (error) {
      console.error('Error submitting package booking:', error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Package Selected</h2>
          <button 
            onClick={() => navigate('/packages')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Book Health Package</h1>
          <p className="text-xl text-teal-100">Schedule your {selectedPackage.name} with our recommended doctor</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {submitted && (
            <div className="mb-8 p-6 bg-teal-50 border-2 border-teal-500 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-teal-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-teal-800">Package Booked Successfully!</h3>
                  <p className="text-teal-700">We'll send confirmation to your email shortly. Redirecting...</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-600">Package Summary</h3>
                <img 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  src={selectedPackage.image}
                  alt={selectedPackage.name}
                />
                <h4 className="text-2xl font-bold text-teal-600 mb-2">{selectedPackage.price}</h4>
                <h5 className="text-lg font-semibold text-gray-800 mb-4">{selectedPackage.name}</h5>
                <ul className="space-y-2">
                  {selectedPackage.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {suggestedDoctor && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-blue-800">Recommended Doctor</span>
                    </div>
                    <p className="text-sm text-gray-700">{suggestedDoctor.name}</p>
                    <p className="text-sm text-blue-600 font-medium">{suggestedDoctor.specialty}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-teal-600">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your full name"
                        />
                        {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="+94 771234567"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Age"
                          min="1"
                          max="120"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Doctor & Schedule */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-teal-600">Assigned Doctor & Schedule</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Assigned Doctor *</label>
                        <input
                          type="text"
                          name="doctor"
                          value={formData.doctor}
                          readOnly
                          className="w-full px-4 py-3 border-2 border-teal-300 bg-teal-50 rounded-lg text-gray-800 font-medium cursor-not-allowed"
                        />
                        <p className="text-teal-600 text-sm mt-1 font-medium">✓ Doctor automatically assigned for this package</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-teal-500 transition ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select Time Slot</option>
                          {timeSlots.map((slot, idx) => (
                            <option key={idx} value={slot}>{slot}</option>
                          ))}
                        </select>
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Doctor Details Card */}
                    {getSelectedDoctor() && (
                      <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-2 border-teal-300 mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Doctor Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-start">
                            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mr-4 shadow-md">
                              <span className="text-2xl font-bold text-white">{getSelectedDoctor().name.charAt(4)}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-800">{getSelectedDoctor().name}</h4>
                              <p className="text-teal-600 font-semibold">{getSelectedDoctor().specialty}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-xs text-gray-600 font-semibold">Experience</p>
                              <p className="text-lg font-bold text-teal-600">{getSelectedDoctor().experience}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-xs text-gray-600 font-semibold">Rating</p>
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-yellow-500">{getSelectedDoctor().rating}</span>
                                <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-xs text-gray-600 font-semibold">Hospital</p>
                              <p className="font-semibold text-gray-800">{getSelectedDoctor().hospital}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-xs text-gray-600 font-semibold">Availability</p>
                              <p className="font-semibold text-teal-600">{getSelectedDoctor().availability}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-teal-600">Additional Information</h2>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition"
                        placeholder="Any additional information you'd like to share"
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/packages')}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagesForm;
