import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Brain, Shield, Zap, Target, Settings, TrendingUp } from "lucide-react";
import { ModelViewer } from "./ModelViewer";

const features = [
  {
    icon: Brain,
    title: "Machine Learning Adaptation",
    description: "EMG sensors use machine learning to iterate and improve, providing personalized assistance that adapts to your unique stroke pattern.",
    color: "text-primary"
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
    description: "110° range of motion with automatic disengagement and 2× safety factor, ensuring secure operation during all rehabilitation activities.",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Precision Control",
    description: "Advanced EMG sensors provide precise muscle activity detection and response for natural movement assistance.",
    color: "text-medical-teal"
  },
  {
    icon: Settings,
    title: "Customizable Settings",
    description: "Adjustable resistance levels and personalized configurations to match your specific rehabilitation needs and progress.",
    color: "text-primary"
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
    <section id="features" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="bg-gradient-primary bg-clip-text text-transparent">Second-Arm</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary assistive device that adapts to you, enhances your strength,
            and provides safe, stable support for daily activities.
          </p>
        </motion.div>

        {/* Fixed 3D model viewer on top */}
        <div className="w-full max-w-4xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ModelViewer />
          </motion.div>
        </div>

        {/* Slider below */}
        <div className="relative w-full max-w-2xl">
          {/* Feature panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="text-center">
                <div className={`p-6 rounded-2xl bg-gradient-primary/10 ${features[current].color} inline-block mb-8`}>
                  {(() => {
                    const IconComponent = features[current].icon;
                    return <IconComponent className="w-12 h-12" />;
                  })()}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {features[current].title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {features[current].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              className="p-4 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-200 group"
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
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-4 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-200 group"
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