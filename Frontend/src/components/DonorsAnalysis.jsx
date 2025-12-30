import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

// Register chart components
Chart.register(...registerables);

const DonorsAnalysis = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donors');
        if (!response.ok) {
          throw new Error('Failed to fetch donors');
        }
        const data = await response.json();
        setDonors(data.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Prepare data for charts
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const bloodGroupCounts = bloodGroups.map(group => 
    donors.filter(donor => donor.bloodGroup === group).length
  );

  const genderCounts = {
    Male: donors.filter(donor => donor.gender === 'Male').length,
    Female: donors.filter(donor => donor.gender === 'Female').length
  };

  // Chart data
  const barChartData = {
    labels: bloodGroups,
    datasets: [
      {
        label: 'Number of Donors',
        data: bloodGroupCounts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderCounts.Male, genderCounts.Female],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Donors Analysis</h1>
          <p className="text-xl text-gray-600 mt-2">
            Statistical overview of blood donors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Blood Group Distribution
            </h2>
            <div className="h-96">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Donors'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Blood Groups'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Gender Distribution
            </h2>
            <div className="h-96">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors"
          >
            Back to Donor Details
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonorsAnalysis;