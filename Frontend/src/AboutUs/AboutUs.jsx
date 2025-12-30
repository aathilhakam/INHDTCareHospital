import React from 'react';
import { FaClinicMedical, FaUserMd, FaAward, FaMicroscope, FaHeartbeat } from 'react-icons/fa';
import Footer from '../components/Footer';
const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Let us introduce ourselves</h2>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About <span className="text-blue-600">INHDT Care Hospital</span>
          </h1>
          <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              INHDT Care Hospital is renowned for its exceptional healthcare services, delivered by a friendly, skilled staff. With unique architecture that promotes physical and psychological comfort, it aims to enhance patient well-being.
            </p>
            <p className="text-lg text-gray-700">
              Offering gold standard dental and medical treatments, including root canals, crowns, and emergency care, the hospital invites Sri Lankans to experience innovative healthcare.
            </p>
            <p className="text-lg text-gray-700">
              The patient-centered atmosphere which is soothed by relaxing music lets the patient have a wonderful experience at our hospital. Furthermore, the patient is cared for by a competent and efficient staff.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="italic text-gray-800">
                "We need to introduce a world class service to Sri Lanka with promising standards and unparalleled hospitality. This is a challenge, but we are ready to take up this challenge for the sake of the health sector in Sri Lanka"
              </p>
              <p className="mt-2 font-medium text-blue-600">- Director of INHDT Care Hospital</p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="/INHDTCARE.png" 
              alt="INHDT Care Hospital Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-blue-50 rounded-xl p-8 mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Root Canal Treatments",
              "Dental Crowns & Bridges",
              "Orthodontic Treatments",
              "Specialist Medical Consultations",
              "Emergency Treatments",
              "X-Ray Diagnostic Services",
              "Pharmacy Services",
              "Laboratory Services",
              "Preventive Healthcare"
            ].map((service, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaClinicMedical className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaHeartbeat className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 italic font-medium mb-4">"Transforming Healthcare, Enriching Lives"</p>
            <p className="text-gray-700">
              Our vision for the next decade is to become the leading full-scale hospital known for delivering exceptional patient-centered care and innovation and to be a beacon of health and wellness, fostering a healthier, happier, and more vibrant community over the next 10 years and beyond.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaUserMd className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700">
              Dedicated to Healing, Caring for Life and to provide exceptional healthcare services to our patients and community by prioritizing the health and well-being of our patients, delivering compassionate, personalized, and respectful care in a safe and supportive environment while striving for medical excellence.
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Strengths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaAward className="h-8 w-8 text-blue-600" />,
                title: "Quality Medical Care",
                description: "Strong reputation for high-quality medical care, advanced technology, and skilled staff"
              },
              {
                icon: <FaClinicMedical className="h-8 w-8 text-blue-600" />,
                title: "Specialized Services",
                description: "Advanced dental services including implants and cosmetic dentistry"
              },
              {
                icon: <FaUserMd className="h-8 w-8 text-blue-600" />,
                title: "Experienced Staff",
                description: "Well-trained healthcare professionals providing compassionate care"
              },
              {
                icon: <FaMicroscope className="h-8 w-8 text-blue-600" />,
                title: "Cutting-Edge Technology",
                description: "Latest medical equipment enhancing patient care and outcomes"
              }
            ].map((strength, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  {strength.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{strength.title}</h4>
                <p className="text-gray-700">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;