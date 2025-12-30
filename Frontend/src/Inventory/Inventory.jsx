import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from 'react-chartjs-2';
import Footer from "../components/Footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Inventory = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    // Generate random mock data
    const mockData = Array.from({ length: 7 }, (_, i) => ({
      name: `Item ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: Math.floor(Math.random() * 20),
    }));
    setInfo(mockData);
  }, []);

  const totalPrice = info.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalLength = info.length;
  const totalQuantity = info.reduce((sum, item) => sum + item.quantity, 0);
  const averagePrice = totalQuantity ? (totalPrice / totalQuantity).toFixed(2) : 0;
  const mostExpensiveItem = info.reduce((max, item) => (item.price > max.price ? item : max), info[0] || {});
  const leastExpensiveItem = info.reduce((min, item) => (item.price < min.price ? item : min), info[0] || {});

  const pieChartData = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        label: 'Inventory Status',
        data: [
          info.filter(item => item.quantity > 0).length,
          info.filter(item => item.quantity === 0).length
        ],
        backgroundColor: ['#003366', '#ff6384'],
      },
    ],
  };

  const barChartData = {
    labels: info.map(item => item.name),
    datasets: [
      {
        label: 'Inventory Quantity',
        data: info.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: info.map(item => item.name),
    datasets: [
      {
        label: 'Item Price Trend',
        data: info.map(item => item.price),
        borderColor: '#ff5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-[1000px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/18966875/pexels-photo-18966875/free-photo-of-machine-on-a-construction.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' }}>
      <div className="relative min-h-full bg-black bg-opacity-50 p-8">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center text-slate-400 mb-8">
            <h1 className="text-4xl font-extrabold">Dashboard</h1>
            <div className="text-xl">
              <p className="mb-2">Total Inventory Price: <span className="font-semibold">${totalPrice}</span></p>
              <p>Total Items: <span className="font-semibold">{totalLength} items</span></p>
              <p className="mt-4">Average Item Price: <span className="font-semibold">${averagePrice}</span></p>
            </div>
          </div>

          {/* Expensive & Cheapest Items */}
          <div className="flex space-x-6 mb-12">
            <div className="bg-black bg-opacity-90 text-slate-400 p-6 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-center">Most Expensive Item</h2>
              <p className="text-center">{mostExpensiveItem?.name ? `${mostExpensiveItem.name} - $${mostExpensiveItem.price}` : 'Loading...'}</p>
            </div>

            <div className="bg-black bg-opacity-90 text-slate-400 p-6 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-center">Least Expensive Item</h2>
              <p className="text-center">{leastExpensiveItem?.name ? `${leastExpensiveItem.name} - $${leastExpensiveItem.price}` : 'Loading...'}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex space-x-6 mb-12">
            {/* Pie Chart */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Inventory Status</h2>
              <div className="w-full h-[300px]">
                <Pie data={pieChartData} />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Inventory Quantity per Item</h2>
              <div className="w-full h-[400px]">
                <Bar data={barChartData} />
              </div>
            </div>

            {/* Line Chart */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Price Trend of Items</h2>
              <div className="w-full h-[300px]">
                <Line data={lineChartData} />
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inventory;
