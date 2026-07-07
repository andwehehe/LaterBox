import Navbar from '../../pages/dashboard/Navbar';
import Hero from '../../pages/dashboard/Hero';
import LogosBar from '../../pages/dashboard/LogosBar';
import Features from '../../pages/dashboard/Features';
import CTA from '../../pages/dashboard/CTA';
import Footer from '../../pages/dashboard/Footer';

function Dashboard() {
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

export default Dashboard;