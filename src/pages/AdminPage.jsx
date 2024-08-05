import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Loading from "../components/Loading";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
  const [totalData, setTotalData] = useState({
    totalQuestion: 0,
    totalArticles: 0,
    totalAudio: 0,
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/getTotalContent');
        setTotalData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchTotalData();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  const chartData = {
    labels: ['Questions', 'Articles', 'Audio Files', 'Users'],
    datasets: [
      {
        label: 'Total Count',
        data: [
          totalData.totalQuestion,
          totalData.totalArticles,
          totalData.totalAudio,
          totalData.totalUser
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 min-h-screen flex justify-end">
      <div className="w-full max-w-3xl bg-white border-1 rounded-lg p-6">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(totalData).map(([key, value]) => (
            <div key={key} className="bg-white border-2 rounded-lg p-4 transform transition-transform hover:scale-105">
              <h2 className="text-lg font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
              <p className="text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white border-2 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Data Overview</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
