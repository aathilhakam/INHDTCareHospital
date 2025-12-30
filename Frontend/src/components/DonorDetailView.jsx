import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaPrint } from 'react-icons/fa';

const DonorDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/donors/${id}`);
        const data = await response.json();
        if (data.success) {
          setDonor(data.data);
        }
      } catch (error) {
        console.error('Error fetching donor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Donor not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Donors
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/edit-donor/${donor._id}`)}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <FaEdit className="mr-2" /> Edit Donor
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPrint className="mr-2" /> Print
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Donor Details</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4 border-b pb-2">Personal Information</h2>
              <DetailItem label="Full Name" value={donor.fullName} />
              <DetailItem label="Age" value={donor.age} />
              <DetailItem label="Gender" value={donor.gender} />
              <DetailItem label="Blood Group" value={donor.bloodGroup} highlight />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4 border-b pb-2">Contact Information</h2>
              <DetailItem label="Address" value={donor.address} />
              <DetailItem label="Email" value={donor.email} />
              <DetailItem label="Contact Number" value={donor.contactNumber} />
              <DetailItem label="Registration Date" value={new Date(donor.createdAt).toLocaleDateString()} />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4 border-b pb-2">Donation Status</h2>
            <div className="flex items-center">
              <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
                donor.donationStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                donor.donationStatus === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {donor.donationStatus}
              </span>
              {donor.donationStatus === 'Pending' && (
                <button
                  onClick={() => navigate(`/edit-donor/${donor._id}`)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Update Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, highlight = false }) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`${highlight ? 'text-red-600 font-bold text-lg' : 'text-gray-800 font-medium'}`}>
      {value || 'Not provided'}
    </p>
  </div>
);

export default DonorDetailView;