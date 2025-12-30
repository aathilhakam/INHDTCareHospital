import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-[#008037] tracking-wide uppercase">Get in touch</h2>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact <span className="text-[#008037]">INHDT Care Hospital</span>
          </h1>
          <div className="w-20 h-1 bg-[#008037] mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaMapMarkerAlt className="h-6 w-6 text-[#008037]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-700">
                  119/3, Ragama Road,<br />
                  Kadawatha, Sri Lanka
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaPhone className="h-6 w-6 text-[#008037]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-700">
                  +94 114 960 260<br />
                  +94 112 922 717
                </p>
                <h4 className="text-md font-semibold text-gray-900 mt-3">Hotline</h4>
                <p className="text-gray-700">+94 740 604 680</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaEnvelope className="h-6 w-6 text-[#008037]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <a 
                  href="mailto:INHDTkadawatha@gmail.com" 
                  className="text-gray-700 hover:text-[#008037] transition-colors"
                >
                  INHDTkadawatha@gmail.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaClock className="h-6 w-6 text-[#008037]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Working Hours</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Monday - Friday:</span> 8:00 AM - 8:00 PM<br />
                  <span className="font-medium">Saturday:</span> 8:00 AM - 4:00 PM<br />
                  <span className="font-medium">Sunday:</span> 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#008037] hover:text-[#006a2c] text-xl bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="text-[#008037] hover:text-[#006a2c] text-xl bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="text-[#008037] hover:text-[#006a2c] text-xl bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="text-[#008037] hover:text-[#006a2c] text-xl bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm transition-colors">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Where to Find Us */}
          <div className="bg-[#f5f5f5] p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Where to Find Us</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">By Public Transport</h4>
                <p className="text-gray-700">
                  We are conveniently located near Kadawatha junction, accessible by multiple bus routes from Colombo and surrounding areas.
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">By Private Vehicle</h4>
                <p className="text-gray-700">
                  Ample parking space available for patients and visitors. Located just 500m from the Kadawatha exit on the Colombo-Kandy highway.
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">Landmarks</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Opposite to Kadawatha Central Bus Stand</li>
                  <li>Adjacent to People's Bank</li>
                  <li>Near Kadawatha Police Station</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Location</h3>
          <iframe 
            title="INHDT Care Hospital Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31690.28436866564!2d79.989949!3d7.000714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDAnMDIuNiJOIDc5wrA1OScyMy44IkU!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
            className="w-full h-96 rounded-lg shadow-md border-2 border-[#008037]"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;