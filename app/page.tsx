import HeroSection from '@/components/home/HeroSection';
import CurrencyConverter from '@/components/home/CurrencyConverter';
import RatesSlideshow from '@/components/home/RatesSlideshow';
import ContactCTA from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <CurrencyConverter />
      <RatesSlideshow />
      <ContactCTA />
    </>
  );
}
