import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Ensure installed via npm

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const mockData = [
      { _id: 1, doctorName: "Dr. John Smith", Docdate: "2025-05-06", Time: "10:00 AM" },
      { _id: 2, doctorName: "Dr. Alice Brown", Docdate: "2025-05-07", Time: "02:00 PM" },
      { _id: 3, doctorName: "Dr. David Kim", Docdate: "2025-05-08", Time: "11:30 AM" },
    ];
    setAppointments(mockData);
    setFilter(mockData);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilter(appointments);
    } else {
      const filteredData = appointments.filter((appointment) =>
        appointment.doctorName.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, appointments]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Doctor Name", "Date", "Time"]],
      body: filter.map((appointment) => [
        appointment.doctorName,
        appointment.Docdate,
        appointment.Time,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] },
    });
    doc.save("appointments.pdf");
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-blue-900 text-white h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/doctors-day-handsome-brunette-cute-guy-medical-gown-thinking-wearing-glasses.jpg?alt=media&token=bf41b8f3-b7ce-411b-a8f0-c34cf42a5c7c')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">Your Health, Our Priority</h1>
          <p className="text-xl mb-6">Book an appointment with the best healthcare professionals</p>
          <a href="/add" className="bg-blue-600 text-white py-2 px-6 rounded-full text-xl transition duration-300 hover:bg-blue-500">
            Book Appointment
          </a>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-8">Available Doctors</h2>
          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Search by Doctor's Name"
              className="w-72 h-10 bg-white rounded-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white ml-6 py-2 px-4 rounded-2xl"
            >
              Download PDF
            </button>
          </div>
          <div className='overflow-x-auto scrollbar-none lg:h-[400px]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filter.length > 0 ? (
                filter.map((appointment) => (
                  <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">{appointment.doctorName}</h3>
                    <p className="text-gray-700 mb-4">{appointment.Docdate}</p>
                    <p className="text-gray-600 mb-6">{appointment.Time}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <h3>No doctors found with that name.</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Appointment;
