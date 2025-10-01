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
    <div className="relative">
      <Navigation />
      
      {/* Enhanced Scrolling Experience */}
      <main className="fixed-scroll-container">
        <section className="scroll-card">
          <HeroSection />
        </section>
        
        <section className="scroll-card">
          <StatsSection />
        </section>
        
        <section className="scroll-card">
          <ProductShowcase />
        </section>
        
        <section className="scroll-card">
          <TechnologySection />
        </section>
        
        <section className="scroll-card">
          <AboutSection />
        </section>
        
        <section className="scroll-card">
          <ContactSection />
        </section>
        
        <section className="scroll-card">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Index;