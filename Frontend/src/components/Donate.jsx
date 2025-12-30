import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Donate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    address: '',
    gender: '',
    bloodGroup: '',
    contactNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 18) {
      newErrors.age = 'You must be 18 or older to donate';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!/^07\d{8}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Must start with 07 and have 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must be a @gmail.com address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:5000/api/donors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }
        
        const data = await response.json();
        navigate('/donordetails', { state: data.data });
      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white py-12 px-4">
      <div className="pt-20">
        
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 bg-gradient-to-r from-green-400 to-green-600 text-white py-8 px-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">
            <span className="text-3xl">Welcome!</span> Life Savers
          </h1>
          <p className="text-xl opacity-90">Your donation can save up to 3 lives</p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-green-600">
          <div className="bg-red-600 py-3 px-4">
            <h2 className="text-xl font-bold text-white">
              Donor Registration Form
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errors.submit && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{errors.submit}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  placeholder="Thakkif Ahamed"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="18+"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="New Kandy Road, Malabe"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                <div className="flex space-x-6">
                  {['Male', 'Female'].map(gender => (
                    <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="h-5 w-5 text-red-600 focus:ring-red-500"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 appearance-none bg-white"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">+94</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    pattern="07\d{8}"
                    className="w-full p-3 pl-14 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    placeholder="7XXXXXXXX"
                  />
                </div>
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="example@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${isSubmitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Submit Donation'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;