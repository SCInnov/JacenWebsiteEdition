import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Zap, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-0" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent z-0" />
      <div className="absolute inset-0 opacity-10 z-0"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      />
      <div className="absolute inset-0 z-0 opacity-5"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
             mixBlendMode: 'overlay'
           }}
      />
      
      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 space-y-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo behind / massive, low opacity or subtle */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{ opacity: 0.1 }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <img
            src="/Second Chance Icon.svg"
            alt="Logo"
            className="w-[40rem] h-[40rem] md:w-[50rem] md:h-[50rem] lg:w-[60rem] lg:h-[60rem] xl:w-[70rem] xl:h-[70rem] 2xl:w-[80rem] 2xl:h-[80rem] object-contain"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white leading-tight z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Reimagining <span className="block bg-gradient-primary bg-clip-text text-transparent">Stroke Care</span>
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          We imagine a world where people can regain independence through
          innovative assistive technology and adaptive rehabilitation.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 shadow-lg">
            Learn More <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-4">
            Contact Us
          </Button>
        </motion.div>
      </motion.div>
      
    </section>
  );
};