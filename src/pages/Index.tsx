import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <HeroSection />
      {/* WIP 3D Project - Spacer for sticky hero - COMMENTED OUT FOR LATER WORK */}
      {/* <div style={{ height: '2000vh' }} /> */}
      <main className="transition-all duration-1000 ease-in-out">
        <StatsSection />
        <ProductShowcase />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;