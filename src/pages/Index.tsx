import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TechnologySection } from "@/components/TechnologySection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <HeroSection />
      {/* WIP 3D Project - Spacer for sticky hero - 20 viewport heights to account for much longer sticky duration */}
      {/* <div style={{ height: '2000vh' }} /> */}
      <main className="transition-all duration-500 ease-in-out">
        <StatsSection />
        <ProductShowcase />
        <FeaturesSection />
        <TechnologySection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
