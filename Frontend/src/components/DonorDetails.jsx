import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

const DonorDetails = () => {
  const location = useLocation();
  const donorData = location.state || {};

  const generatePDF = () => {
    try {
      if (!donorData || Object.keys(donorData).length === 0) {
        alert('No donor data available to generate PDF');
        return;
      }

      const doc = new jsPDF();

      if (typeof doc.autoTable !== 'function') {
        autoTable(doc);
      }
  
      // Add hospital logo (with error fallback)
      try {
        doc.addImage('/INHDTLogo.png', 'PNG', 10, 10, 30, 30);
      } catch (e) {
        console.warn('Could not load logo:', e);
      }
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text('INHDT Care Hospital - Donor Registration', 50, 20);
      
      // Add donor details with null checks
      doc.setFontSize(12);
      doc.text(`Donor ID: ${donorData._id || 'N/A'}`, 15, 50);
      doc.text(`Registration Date: ${donorData.createdAt ? new Date(donorData.createdAt).toLocaleDateString() : 'N/A'}`, 15, 60);
      
      // Create table with fallback values
      doc.autoTable({
        startY: 70,
        head: [['Field', 'Value']],
        body: [
          ['Full Name', donorData.fullName || 'N/A'],
          ['Age', donorData.age || 'N/A'],
          ['Gender', donorData.gender || 'N/A'],
          ['Blood Group', donorData.bloodGroup || 'N/A'],
          ['Address', donorData.address || 'N/A'],
          ['Contact Number', donorData.contactNumber || 'N/A'],
          ['Email', donorData.email || 'N/A']
        ],
        styles: {
          cellPadding: 5,
          fontSize: 10,
          valign: 'middle'
        },
        headStyles: {
          fillColor: [220, 53, 69],
          textColor: 255
        }
      });
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Thank you for your donation!', 14, doc.internal.pageSize.height - 10);
      
      doc.save(`Donor_${donorData.fullName || 'Details'}_Details.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 bg-gradient-to-r from-green-500 to-teal-500 text-white py-8 px-6 rounded-xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Thank You for Registering!</h1>
          <p className="text-xl opacity-90">Your information has been successfully recorded</p>
        </div>

        {/* Donor Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 py-3 px-6">
            <h2 className="text-2xl font-bold text-white">
              Donor Information
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Personal Details</h3>
                  <InfoItem label="Full Name" value={donorData.fullName} />
                  <InfoItem label="Age" value={donorData.age} />
                  <InfoItem label="Gender" value={donorData.gender} />
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Medical Information</h3>
                  <InfoItem 
                    label="Blood Group" 
                    value={donorData.bloodGroup} 
                    highlight 
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Contact Details</h3>
                  <InfoItem label="Address" value={donorData.address} />
                  <InfoItem label="Email" value={donorData.email} />
                  <InfoItem label="Contact Number" value={donorData.contactNumber} />
                </div>

                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Next Steps</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Our team will contact you within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Please bring your NIC when you come to donate</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Stay hydrated before donation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-8 bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-600 mb-3">Emergency Contact</h3>
              <p className="text-gray-700 mb-4">For immediate assistance, please contact:</p>
              <div className="flex items-center">
                <svg className="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-bold text-lg">National Blood Center</p>
                  <p className="text-gray-700">011-2367637 (24/7 Hotline)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Action Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          <Link 
            to="/donorsanalysis"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center"
          >
            View the Donors Analysis
          </Link>
          <button
            onClick={generatePDF}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Download Your Donor Registration Details PDF
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Reusable component for info items
const InfoItem = ({ label, value, highlight = false }) => (
  <div className="mb-3">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`font-medium ${highlight ? 'text-red-600 text-lg' : 'text-gray-800'}`}>
      {value || 'Not provided'}
    </p>
  </div>
);

export default DonorDetails;