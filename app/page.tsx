import Hero from "./components/home/Hero";
import FeaturesStrip from "./components/home/FeaturesStrip";
import ServicesGrid from "./components/home/ServicesGrid";
import Testimonials from "./components/home/Testimonials";
import Partners from "./components/home/Partners";
import ContactCTA from "./components/home/ContactCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <ServicesGrid />
      <Testimonials />
      <Partners />
      <ContactCTA />
    </main>
  );
}
