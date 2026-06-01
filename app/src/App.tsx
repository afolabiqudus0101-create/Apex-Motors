import { useState, useCallback } from 'react';
import ThreeScene from './components/ThreeScene';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import FeaturedVehicles from './sections/FeaturedVehicles';
import BrandMarquee from './sections/BrandMarquee';
import WhyApex from './sections/WhyApex';
import FeaturedVideo from './sections/FeaturedVideo';
import Testimonials from './sections/Testimonials';
import FinancingServices from './sections/FinancingServices';
import CTABanner from './sections/CTABanner';
import Footer from './sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <>
          <ThreeScene />
          <Navigation />
          <Hero />

          {/* Content sections scroll over the 3D canvas */}
          <FeaturedVehicles />
          <BrandMarquee />
          <WhyApex />
          <FeaturedVideo />
          <Testimonials />
          <FinancingServices />
          <CTABanner />
          <Footer />
        </>
      )}
    </>
  );
}
