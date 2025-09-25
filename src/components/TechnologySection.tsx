import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Activity, Shield, Gauge, Wifi, Battery } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const techFeatures = [
  {
    icon: Activity,
    title: "EMG Muscle Sensors",
    description: "Advanced electromyography sensors detect muscle signals and translate them into precise device movements.",
    badge: "Machine Learning",
    details: ["Real-time signal processing", "Adaptive learning algorithms", "Personalized calibration"]
  },
  {
    icon: Cpu,
    title: "Intelligent Processing",
    description: "Custom algorithms process muscle signals and adapt to different stroke patterns and severity levels.",
    badge: "AI-Powered",
    details: ["Pattern recognition", "Predictive assistance", "Continuous optimization"]
  },
  {
    icon: Shield,
    title: "Safety Systems",
    description: "Multiple safety mechanisms ensure user protection with automatic disengagement and fail-safes.",
    badge: "2x Safety Factor",
    details: ["Force limiting", "Emergency stops", "Stability monitoring"]
  },
  {
    icon: Gauge,
    title: "Performance Monitoring",
    description: "Real-time tracking of progress, range of motion, and strength improvements over time.",
    badge: "Progress Tracking",
    details: ["Milestone detection", "Therapy insights", "Recovery analytics"]
  }
];

export const TechnologySection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuTransitioning, setIsMenuTransitioning] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  // Reset all transition states
  const resetTransitionStates = () => {
    setIsZooming(false);
    setIsMenuTransitioning(false);
    setIsTransitioning(false);
    setClickedButtonIndex(null);
  };

  // Handle feature navigation with zoom transition
  const handleFeatureClick = (index: number) => {
    // Reset any existing transition states first
    resetTransitionStates();
    
    // Small delay to ensure reset is complete
    setTimeout(() => {
      setClickedButtonIndex(index);
      setIsZooming(true);
      setIsMenuTransitioning(true);
      
      // Start zoom transition
      setTimeout(() => {
        // If clicking on Performance Monitoring (index 3) or EMG Muscle Sensors (index 0), show video first
        if ((index === 3 || index === 0) && !videoPlayed) {
          setActiveVideoIndex(index);
          setActiveFeature(5); // 5 = video
        } else {
          setActiveFeature(index + 1); // 1-4 = features
        }
        
        // Complete transition
        setTimeout(() => {
          setIsMenuTransitioning(false);
          setIsZooming(false);
          setClickedButtonIndex(null);
        }, 400);
      }, 600); // Back to original zoom duration
    }, 50); // Small delay to ensure clean state reset
  };

  // Handle back to overview with transition
  const handleBackToOverview = () => {
    setIsMenuTransitioning(true);
    setIsZooming(false);
    setClickedButtonIndex(null);
    
    // Start transition out
    setTimeout(() => {
      setActiveFeature(0);
      setVideoPlayed(false); // Reset video state so videos can play again
      setActiveVideoIndex(null); // Reset active video
      
      // Complete transition
      setTimeout(() => {
        setIsMenuTransitioning(false);
      }, 300);
    }, 300);
  };

  // Control video playback based on active feature
  useEffect(() => {
    if (videoRef.current && !videoPlayed) {
      if (activeFeature === 5) {
        // Start playing when video section is active
        videoRef.current.play().catch(console.error);
      } else {
        // Pause when not on video section
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning
      }
    }
  }, [activeFeature, videoPlayed]);

  // Handle smooth transition from video to notecard
  const handleVideoEnd = () => {
    setIsTransitioning(true);
    setIsZooming(false);
    setClickedButtonIndex(null);
    
    // Start fade out transition
    setTimeout(() => {
      setVideoPlayed(true);
      // Show the appropriate feature after video (EMG = index 1, Performance = index 4)
      const targetFeature = activeVideoIndex === 0 ? 1 : 4;
      setActiveFeature(targetFeature);
      
      // Complete transition after notecard appears
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 500); // Half second fade out
  };

  // Handle video load error - fallback to notecard
  const handleVideoError = () => {
    console.log('Video failed to load, showing notecard directly');
    setIsTransitioning(true);
    setIsZooming(false);
    setClickedButtonIndex(null);
    
    setTimeout(() => {
      setVideoPlayed(true);
      const targetFeature = activeVideoIndex === 0 ? 1 : 4;
      setActiveFeature(targetFeature);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 500);
  };

  return (
    <section id="technology" className="relative bg-background min-h-screen">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-4 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Header Section - Only visible when no feature is selected */}
          {activeFeature === 0 && (
            <div className={`text-center mb-16 transition-all duration-500 ease-in-out ${
              isMenuTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
            }`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                A Device That <span className="bg-gradient-primary bg-clip-text text-transparent">Learns</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Our advanced technology stack combines muscle sensing, machine learning, 
                and safety systems to create a truly adaptive rehabilitation experience.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Click any feature below to explore in detail
              </p>
              
              {/* Feature Icons Overview - Connected Design */}
              <div className="max-w-5xl mx-auto mb-12 relative z-10">
                {/* Connection lines for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-y-1/2"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  {techFeatures.map((tech, index) => (
                    <div
                      key={index}
                      className={`text-center cursor-pointer bg-card border-2 rounded-2xl p-6 pb-10 hover:border-primary hover:shadow-xl hover:bg-primary/5 transition-all duration-300 w-full relative z-20 group border-border hover:scale-105 ${
                        isZooming && clickedButtonIndex === index 
                          ? 'scale-150 z-50 shadow-2xl border-primary bg-primary/10' 
                          : isZooming && clickedButtonIndex !== index 
                            ? 'opacity-0 scale-75' 
                            : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Button clicked:', index);
                        handleFeatureClick(index);
                      }}
                      style={{ 
                        pointerEvents: isZooming ? 'none' : 'auto',
                        position: 'relative',
                        zIndex: isZooming && clickedButtonIndex === index ? 50 : 20,
                        transition: isZooming ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 0.3s ease'
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFeatureClick(index);
                        }
                      }}
                    >
                      {/* Connection dots for mobile */}
                      <div className="md:hidden absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary/30 rounded-full"></div>
                      
                      {/* Icon with enhanced styling */}
                      <div className="p-5 rounded-2xl mx-auto mb-4 transition-all duration-300 relative bg-gradient-primary/10 text-primary hover:bg-gradient-primary hover:text-white hover:shadow-lg">
                        <tech.icon className="w-8 h-8 mx-auto" />
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 bg-gradient-primary opacity-0 group-hover:opacity-10"></div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 hover:text-primary">{tech.title}</h3>
                      
                      <div className="relative">
                        <Badge 
                          variant="secondary" 
                          className="text-xs transition-all duration-300 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:shadow-xl group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:text-white font-medium"
                        >
                          {tech.badge}
                        </Badge>
                        
                        {/* "Learn more" text that appears on hover */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500 text-white shadow-lg">
                            learn more
                          </span>
                        </div>
                      </div>
                      
                      {/* Subtle corner accent */}
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300 bg-primary/30 group-hover:bg-primary/60"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Video Section for EMG Muscle Sensors and Performance Monitoring */}
          {!videoPlayed && activeFeature === 5 && (
            <div className={`w-full transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              {/* Back to Overview Button */}
              <div className="text-center mb-6">
                <button
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg border border-transparent hover:border-primary/20 transition-all duration-300 font-medium"
                  onClick={handleBackToOverview}
                >
                  ← Back to Overview
                </button>
              </div>
              
              <div className="relative w-full max-w-4xl mx-auto group">
                <video 
                  ref={videoRef}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  onEnded={handleVideoEnd}
                  onError={handleVideoError}
                >
                  <source 
                    src={activeVideoIndex === 0 ? "/EMGSensors.mp4" : "/Track your progress.mp4"} 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {/* Individual Feature Sections */}
          {techFeatures.map((tech, index) => {
            return (
              activeFeature === index + 1 && (
                <div 
                  key={index} 
                  className={`w-full flex justify-center transition-all duration-500 ease-out ${
                    isMenuTransitioning 
                      ? 'opacity-0 scale-95 translate-y-4' 
                      : index === 3 && videoPlayed && isTransitioning 
                        ? 'opacity-0 scale-95' 
                        : 'opacity-100 scale-100 translate-y-0'
                  }`}
                >
                  <Card className="p-12 hover:shadow-card transition-all duration-300 max-w-4xl w-full">
                    <div className="text-center mb-8">
                      <button
                        className="mb-6 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg border border-transparent hover:border-primary/20 transition-all duration-300 font-medium"
                        onClick={handleBackToOverview}
                      >
                        ← Back to Overview
                      </button>
                      <div className="p-6 rounded-2xl bg-gradient-primary/10 text-primary mx-auto mb-6 w-fit">
                        <tech.icon className="w-16 h-16" />
                      </div>
                      <h3 className="text-4xl font-bold mb-4">{tech.title}</h3>
                      <Badge variant="secondary" className="text-lg px-4 py-2">{tech.badge}</Badge>
                    </div>
                    
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                      {tech.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tech.details.map((detail, detailIndex) => (
                        <div 
                          key={detailIndex} 
                          className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )
            );
          })}

        </div>
      </div>
    </section>
  );
};