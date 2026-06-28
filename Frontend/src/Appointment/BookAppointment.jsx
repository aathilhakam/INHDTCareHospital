import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDoctor = location.state?.selectedDoctor;

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedDoctor) {
      setFormData(prev => ({
        ...prev,
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty
      }));
    }
  }, [selectedDoctor]);

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

  const getSelectedDoctor = () => {
    return doctors.find(d => d.name === formData.doctor);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'doctor' && {
        specialty: doctors.find(d => d.name === value)?.specialty || ''
      })
    }));
    // Clear error for this field
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
    if (!formData.reason.trim()) newErrors.reason = "Reason for visit is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Here you would typically send the data to your backend
      console.log('Appointment Data:', formData);
      
      // Simulate API call
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          patientName: '', email: '', phone: '', age: '', gender: '',
          doctor: '', specialty: '', date: '', time: '', reason: '', notes: ''
        });
        setSubmitted(false);
        navigate('/appointment');
      }, 3000);
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Book Your Appointment</h1>
          <p className="text-xl text-teal-100">Schedule a consultation with our expert doctors</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {submitted && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-green-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-green-800">Appointment Booked Successfully!</h3>
                  <p className="text-green-700">We'll send confirmation to your email shortly. Redirecting...</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Summary Card */}
            <div className="lg:col-span-1">
              {getSelectedDoctor() ? (
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-600">Doctor Summary</h3>
                  <div className="w-full h-40 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-teal-300">
                      <span className="text-4xl font-black text-teal-600">{getSelectedDoctor().name.charAt(4)}</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-teal-600 mb-2">{getSelectedDoctor().name}</h4>
                  <p className="text-lg font-semibold text-gray-800 mb-4">{getSelectedDoctor().specialty}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V7z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-gray-800">{getSelectedDoctor().experience}</span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                      </svg>
                      <span className="font-semibold text-gray-800">{getSelectedDoctor().hospital}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">Rating</p>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-yellow-500">{getSelectedDoctor().rating}</span>
                        <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">Availability</p>
                      <p className="font-semibold text-green-600 text-sm">{getSelectedDoctor().availability}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-2 border-teal-300">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-teal-800">Assigned Doctor</span>
                    </div>
                    <p className="text-sm text-gray-700">{getSelectedDoctor().name}</p>
                    <p className="text-sm text-teal-600 font-medium">{getSelectedDoctor().specialty}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-600">Doctor Summary</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No doctor selected</p>
                    <button 
                      onClick={() => navigate('/appointment')}
                      className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
                    >
                      Select a Doctor
                    </button>
                  </div>
                </div>
              )}
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
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
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
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
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
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
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

              {/* Doctor & Appointment Information */}
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
                    {selectedDoctor ? (
                      <p className="text-blue-600 text-sm mt-1 font-medium">✓ Doctor selected from doctor list</p>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">Please select a doctor from the appointment page</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
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
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-300 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Doctor Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mr-4 shadow-md">
                          <span className="text-2xl font-bold text-white">{getSelectedDoctor().name.charAt(4)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-800">{getSelectedDoctor().name}</h4>
                          <p className="text-blue-600 font-semibold">{getSelectedDoctor().specialty}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-600 font-semibold">Experience</p>
                          <p className="text-lg font-bold text-blue-600">{getSelectedDoctor().experience}</p>
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
                          <p className="font-semibold text-green-600">{getSelectedDoctor().availability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reason for Visit */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-blue-600">Consultation Details</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Visit *</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.reason ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Describe the reason for your visit"
                    rows="4"
                  />
                  {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    placeholder="Any additional information you'd like to share"
                    rows="3"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Confirm Appointment
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/appointment')}
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

export default BookAppointment;
