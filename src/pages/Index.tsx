import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TechnologySection } from "@/components/TechnologySection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="scroll-smooth">
      <Navigation />
      
      {/* Fixed Scrolling Cards */}
      <div className="fixed-scroll-container">
        <div className="scroll-card">
          <HeroSection />
        </div>
        
        <div className="scroll-card">
          <StatsSection />
        </div>
        
        <div className="scroll-card">
          <ProductShowcase />
        </div>
        
        <div className="scroll-card">
          <TechnologySection />
        </div>
        
        <div className="scroll-card">
          <AboutSection />
        </div>
        
        <div className="scroll-card">
          <ContactSection />
        </div>
        
        <div className="scroll-card">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;