import React from 'react';
import ImageCarousel from '../Home/ImageCarousel.jsx';
import WelcomeMessage from '../Home/WelcomeMessage.jsx';
import Footer from './Footer.jsx';


const Home = () => {
  return (
    <div className="home-page">
      <ImageCarousel />
      <WelcomeMessage />
      <Footer />
    </div>
  );
};

export default Home;