import React from 'react';
import { useNavigate } from 'react-router-dom';
import BasicHealthCheck from '../assets/BasicHealthCheck.jpg';
import DiabetesCare from '../assets/DiabetesCare.jpg';
import CardiacScreening from '../assets/CardiacScreening.jpg';
import WomenWellness from '../assets/WomenWellness.jpg';
import SeniorCitizen from '../assets/SeniorCitizen.jpg';
import ChildCare from '../assets/ChildCare.jpg';
import FeverPackage from '../assets/FeverPackage.jpg';
import PostCOVIDCare from '../assets/PostCOVIDCare.jpg';
import DentalCare from '../assets/DentalCare.jpg';
import EyeCheckup from '../assets/EyeCheckup.jpg';
import FitnessPackage from '../assets/FitnessPackage.jpg';
import ThyroidCheckhy from '../assets/ThyroidCheck.jpg';
import Footer from '../components/Footer'

const Content = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: 'Basic Health Check',
      price: 'RS: 500',
      image: BasicHealthCheck,
      includes: ['Doctor Consultation', 'BP Check', 'Basic Blood Test'],
    },
    {
      id: 2,
      name: 'Diabetes Care',
      price: 'RS: 800',
      image: DiabetesCare,
      includes: ['Sugar Test', 'Doctor Consultation', 'Diet Chart'],
    },
    {
      id: 3,
      name: 'Cardiac Screening',
      price: 'RS: 1200',
      image: CardiacScreening,
      includes: ['ECG', 'Cardiologist Consultation', 'Cholesterol Test'],
    },
    {
      id: 4,
      name: 'Women Wellness',
      price: 'RS: 900',
      image: WomenWellness,
      includes: ['Gynec Consultation', 'CBC Test', 'Ultrasound'],
    },
    {
      id: 5,
      name: 'Senior Citizen',
      price: 'RS: 1500',
      image: SeniorCitizen,
      includes: ['Full Body Checkup', 'Bone Density', 'Vitamin Tests'],
    },
    {
      id: 6,
      name: 'Child Care',
      price: 'RS: 600',
      image: ChildCare,
      includes: ['Pediatric Consultation', 'Vaccination', 'Growth Monitoring'],
    },
    {
      id: 7,
      name: 'Fever Package',
      price: 'RS: 400',
      image: FeverPackage,
      includes: ['Doctor Visit', 'Malaria Test', 'Medicines'],
    },
    {
      id: 8,
      name: 'Post-COVID Care',
      price: 'RS: 1000',
      image: PostCOVIDCare,
      includes: ['Chest X-Ray', 'Lung Function Test', 'Vitamin Panel'],
    },
    {
      id: 9,
      name: 'Dental Care',
      price: 'RS: 700',
      image: DentalCare,
      includes: ['Dentist Consultation', 'Cleaning', 'X-Ray'],
    },
    {
      id: 10,
      name: 'Eye Checkup',
      price: 'RS: 550',
      image: EyeCheckup,
      includes: ['Vision Test', 'Optometrist Consultation', 'Pressure Check'],
    },
    {
      id: 11,
      name: 'Complete Fitness',
      price: 'RS: 1800',
      image: FitnessPackage,
      includes: ['BMI Analysis', 'Nutritionist Consultation', 'Fitness Plan'],
    },
    {
      id: 12,
      name: 'Thyroid Check', 
      price: 'RS: 1500', 
      image: ThyroidCheckhy, 
      includes: ['Thyroid Test', 'Doctor Consultation', 'Report Analysis'],
    }
  ];

  const handleBookNow = (pkg) => {
    navigate('/PackagesForm', { 
      state: { selectedPackage: pkg } 
    });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <br /><br />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Affordable Healthcare Packages
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose from our specially designed packages for your needs
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                className="w-full h-48 object-cover" 
                src={pkg.image} 
                alt={pkg.name} 
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
                <p className="mt-2 text-2xl font-bold text-teal-600">{pkg.price}</p>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBookNow(pkg)}
                  className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Content;