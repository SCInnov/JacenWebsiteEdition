import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Brain, Shield, Zap, Target, Settings, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Machine Learning Adaptation",
    description: "EMG sensors use machine learning to iterate and improve, providing personalized assistance that adapts to your unique stroke pattern.",
    color: "text-medical-blue"
  },
  {
    icon: Zap,
    title: "Enhanced Strength",
    description: "10-15 lbs of lift capacity with adaptable modes for every stroke, helping you regain confidence in daily activities.",
    color: "text-medical-teal"
  },
  {
    icon: Shield,
    title: "Safety & Stability",
    description: "110° range of motion with automatic disengagement and 2× safety factor for the advertised carrying capacity.",
    color: "text-medical-blue"
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Secondary sensors adapt to different stroke types, ensuring the device works effectively for your specific rehabilitation needs.",
    color: "text-medical-teal"
  },
  {
    icon: Settings,
    title: "Easy Setup",
    description: "Users can put the device on in seconds, making it practical for daily use without complex setup procedures.",
    color: "text-medical-blue"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Constant tracking of patient's progress to show milestones and provide motivation throughout the rehabilitation journey.",
    color: "text-medical-teal"
  }
];

export const FeaturesSection = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prev = () => {
    setCurrent((c) => (c === 0 ? features.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === features.length - 1 ? 0 : c + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prev();
      } else if (event.key === 'ArrowRight') {
        next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch/swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  return (
    <section id="features" className="h-screen flex items-center justify-center bg-background transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-6">


        {/* Carousel below */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Feature panel using Card component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Card className="p-8 hover:shadow-card transition-all duration-300 border-l-4 border-l-primary">
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-lg bg-gradient-primary/10 ${features[current].color}`}>
                    {(() => {
                      const IconComponent = features[current].icon;
                      return <IconComponent className="w-8 h-8" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-4">{features[current].title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {features[current].description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-200 group"
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === current 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-200 group"
              aria-label="Next feature"
            >
              <ChevronRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};