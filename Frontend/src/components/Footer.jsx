import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#d9d9d9] border-t-4 border-[#008037] rounded-t-lg mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Contact Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
            {/* Address */}
            <div className="space-y-1">
              <h3 className="text-md font-bold text-[#008037]">Address</h3>
              <p className="text-sm text-gray-800">
                119/3, Ragama Road,<br />
                Kadawatha, Sri Lanka
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <h3 className="text-md font-bold text-[#008037]">Phone</h3>
              <p className="text-sm text-gray-800">
                +94 114 960 260<br />
                +94 112 922 717
              </p>
            </div>

            {/* Hotline */}
            <div className="space-y-1">
              <h3 className="text-md font-bold text-[#008037]">Hotline</h3>
              <p className="text-sm text-gray-800">+94 740 604 680</p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <h3 className="text-md font-bold text-[#008037]">Email</h3>
              <a 
                href="mailto:INHDTkadawatha@gmail.com" 
                className="text-sm text-gray-800 hover:text-[#008037] transition-colors"
              >
                INHDTkadawatha@gmail.com
              </a>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="flex justify-center gap-4">
            <a href="#" className="text-[#008037] hover:text-[#006a2c] text-2xl bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-[#008037] hover:text-[#006a2c] text-2xl bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-[#008037] hover:text-[#006a2c] text-2xl bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-[#008037] hover:text-[#006a2c] text-2xl bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

          {/* Google Maps */}
          <div className="w-full lg:w-auto lg:flex-1">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31690.28436866564!2d79.989949!3d7.000714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDAnMDIuNiJOIDc5wrA1OScyMy44IkU!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
              className="w-full h-40 lg:h-32 rounded-lg shadow-sm border-2 border-[#008037]"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          

        {/* Copyright */}
        <div className="text-center text-gray-700 border-t border-[#008037] pt-4">
          <p>© 2020 - INHDT Care Hospital, Kadawatha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;