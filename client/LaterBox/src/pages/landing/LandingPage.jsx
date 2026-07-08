import Navbar from '../../pages/landing/Navbar';
import Hero from '../../pages/landing/Hero';
import LogosBar from '../../pages/landing/LogosBar';
import Features from '../../pages/landing/Features';
import CTA from '../../pages/landing/CTA';
import Footer from '../../pages/landing/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <LogosBar />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;