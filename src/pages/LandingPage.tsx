import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Features from '../components/landing/Features';
import Museum from '../components/landing/Museum';
import Ecosystem from '../components/landing/Ecosystem';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <Hero />
      <About />
      <Features />
      <Museum />
      <Ecosystem />
      <Footer />
    </div>
  );
};

export default LandingPage;