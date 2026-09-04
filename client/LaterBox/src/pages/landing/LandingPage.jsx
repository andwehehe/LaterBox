import Navbar from '../../pages/landing/Navbar';
import Hero from '../../pages/landing/Hero';
import LogosBar from '../../pages/landing/LogosBar';
import Features from '../../pages/landing/Features';
import Footer from '../../pages/landing/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <LogosBar />
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;