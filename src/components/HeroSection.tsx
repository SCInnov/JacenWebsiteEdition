import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Hero Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Heart className="w-4 h-4 text-red-300" />
          <span className="text-sm font-medium">Restoring Independence</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Reimagining
          <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Stroke Care
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
          We imagine a world where we can help people regain their independence through 
          innovative assistive technology and adaptive rehabilitation.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-hero text-lg px-8 py-4"
          >
            Learn More
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
          >
            Contact Us
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-blue-200" />
            </div>
            <div className="text-3xl font-bold mb-1">11.6M</div>
            <div className="text-blue-200">Hemiparesis Patients</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Zap className="w-8 h-8 text-blue-200" />
            </div>
            <div className="text-3xl font-bold mb-1">15 lbs</div>
            <div className="text-blue-200">Lift Capacity</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Heart className="w-8 h-8 text-blue-200" />
            </div>
            <div className="text-3xl font-bold mb-1">110°</div>
            <div className="text-blue-200">Range of Motion</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};