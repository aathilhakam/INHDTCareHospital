import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Analysis from './Analysis';

const DonorDetailsTable = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('All');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);
  const navigate = useNavigate();

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/donors');
      if (!response.ok) {
        throw new Error('Failed to fetch donors');
      }
      const data = await response.json();
      setDonors(data.data);
      setFilteredDonors(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Filter donors based on search term (blood group)
  useEffect(() => {
    if (searchTerm === 'All') {
      setFilteredDonors(donors);
    } else {
      const filtered = donors.filter(donor => 
        donor.bloodGroup === searchTerm
      );
      setFilteredDonors(filtered);
    }
  }, [searchTerm, donors]);

  const handleRefresh = () => {
    fetchDonors();
  };

  const handleNewDonor = () => {
    navigate('/donate');
  };

  const handleEdit = (donor) => {
    navigate('/editform', { state: { donor } });
  };

  const handleDeleteClick = (donor) => {
    setDonorToDelete(donor);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!donorToDelete) return;
    
    setDeleteId(donorToDelete._id);
    try {
      const response = await fetch(`http://localhost:5000/api/donors/${donorToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete donor');
      }

      setDonors(donors.filter(donor => donor._id !== donorToDelete._id));
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteId(null);
      setDonorToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDonorToDelete(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white">
      <div className="pt-20"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Donors Details</h1>
            <p className="text-lg text-gray-600">List of all registered blood donors</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleNewDonor}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Donor
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow border-2 border-green-600 flex-1 max-w-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="bloodGroupSearch" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Blood Group
                  </label>
                  <div className="relative">
                    <select
                      id="bloodGroupSearch"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 appearance-none bg-white"
                    >
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donors Count Info */}
          <div className="text-sm text-gray-500 mb-4 text-right">
            {searchTerm === 'All' ? (
              <>Showing all {donors.length} donors</>
            ) : (
              <>Showing {filteredDonors.length} donors with blood group {searchTerm}</>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete donor <span className="font-semibold">{donorToDelete?.fullName}</span> with blood group <span className="font-semibold">{donorToDelete?.bloodGroup}</span>?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    {deleteId ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Donors Table */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-green-600">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Age</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Registered Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonors.length > 0 ? (
                    filteredDonors.map((donor) => (
                      <tr key={donor._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.fullName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{donor.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            donor.bloodGroup.includes('+') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {donor.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+94 {donor.contactNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(donor.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(donor)}
                              className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(donor)}
                              disabled={deleteId === donor._id}
                              className={`text-white px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                deleteId === donor._id ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              {deleteId === donor._id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 
                          `No donors found with blood group ${searchTerm}` : 
                          'No donors found. Be the first to register!'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
              <h3 className="text-lg font-medium text-gray-900">Total Donors</h3>
              <p className="mt-2 text-3xl font-bold text-red-600">{donors.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
              <h3 className="text-lg font-medium text-gray-900">Male Donors</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {donors.filter(d => d.gender === 'Male').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-pink-600">
              <h3 className="text-lg font-medium text-gray-900">Female Donors</h3>
              <p className="mt-2 text-3xl font-bold text-pink-600">
                {donors.filter(d => d.gender === 'Female').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
              <h3 className="text-lg font-medium text-gray-900">Most Common Blood</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {donors.length > 0 ? 
                  [...new Set(donors.map(d => d.bloodGroup))]
                    .map(group => ({
                      group,
                      count: donors.filter(d => d.bloodGroup === group).length
                    }))
                    .sort((a, b) => b.count - a.count)[0].group 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Analysis />
    </div>
  );
};

export default DonorDetailsTable;