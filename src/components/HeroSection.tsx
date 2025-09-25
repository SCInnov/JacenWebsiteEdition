import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Zap, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollRotate3D } from "./ScrollRotate3D";
import { useState } from "react";

export const HeroSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmailToClipboard = async () => {
    const email = "info@secchance.com";
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <section id="hero" className="relative min-h-[250vh] flex flex-col justify-start items-center bg-background isolate">
      {/* Background Layers - Back layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-[-2]" />
      <div className="absolute inset-0 bg-black/30 dark:bg-black/30 bg-white/20 dark:bg-primary/10 z-[-2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent z-[-2]" />
      
      {/* 3D Model - Middle layer */}
      <ScrollRotate3D 
        className="fixed inset-0 z-[1]"
        modelPath="/SecondArmModel1.glb"
        rotationSpeed={0.5}
        blurIntensity={0.3}
      />
      
      {/* Progressive Blur Background - Green for Light Mode - Back layer */}
      <div className="absolute inset-0 z-[-2] backdrop-blur-sm dark:backdrop-blur-none transition-all duration-1000" />
      <div className="absolute inset-0 z-[-2] bg-gradient-to-br from-green-400/15 via-green-500/8 to-green-600/12 dark:from-transparent dark:via-transparent dark:to-transparent" />
      
      {/* Additional Green Blur Layers for Light Mode - Back layer */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-t from-green-300/20 via-green-400/10 to-green-500/15 dark:from-transparent dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 z-[-2] bg-gradient-to-l from-green-200/25 via-green-300/15 to-green-400/18 dark:from-transparent dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 z-[-2] bg-gradient-to-r from-transparent via-green-300/12 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent" />
      
      <div className="absolute inset-0 opacity-10 z-[-2]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      />
      <div className="absolute inset-0 z-[-2] opacity-5"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
             mixBlendMode: 'overlay'
           }}
      />
      
      
      {/* Main Content */}
      <motion.div
        className="relative z-[100] isolate text-center px-6 space-y-8 max-w-4xl"
        style={{ marginTop: '35vh' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-tight relative z-[100]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, hsl(195 100% 28%), hsl(195 100% 35%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 4px 20px rgba(59, 130, 246, 0.6), 0 2px 8px rgba(59, 130, 246, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.1)' }}>Reimagining</span> <span className="block" style={{ color: '#afc8a0 !important', WebkitTextFillColor: '#afc8a0' }}>Stroke Care</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto relative z-[100]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Transforming rehabilitation through innovative technology and compassionate care
        </motion.p>


        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-[100]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Button 
            size="lg" 
            className={`bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 shadow-lg transition-all duration-300 ${
              isCopied ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
            onClick={copyEmailToClipboard}
          >
            <motion.span
              key={isCopied ? 'copied' : 'contact'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              {isCopied ? 'Copied' : 'Contact Us'}
            </motion.span>
            {!isCopied && <ArrowRight className="ml-2 w-5 h-5" />}
            {isCopied && <Heart className="ml-2 w-5 h-5" />}
          </Button>
        </motion.div>
      </motion.div>
      
    </section>
  );
};