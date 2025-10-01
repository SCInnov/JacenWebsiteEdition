import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center bg-background relative transition-all duration-1000 ease-in-out py-16"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Second Chance</span>
          </h2>
        </motion.div>
        
        {/* Cards Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Our Team */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full border-2 border-green-200 dark:border-green-800" style={{ backgroundColor: 'rgba(34, 197, 94, 0.02)' }}>
              <div className="text-center h-full flex flex-col justify-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Team</h3>
                <p className="text-base leading-relaxed">
                  Founded by innovators with backgrounds in Neuroscience, Engineering, and Finance, 
                  our team combines cutting-edge technology with personalized care to restore what 
                  stroke has taken away.
                </p>
              </div>
            </Card>
          </motion.div>
          
          {/* Mission Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full border-2 border-green-200 dark:border-green-800" style={{ backgroundColor: 'rgba(34, 197, 94, 0.02)' }}>
              <div className="text-center h-full flex flex-col justify-center">
                <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-base leading-relaxed">
                  We believe that stroke shouldn't define your independence. We're revolutionizing 
                  stroke rehabilitation by harnessing cutting-edge technology to dramatically accelerate 
                  recovery and restore strength, mobility, and independence for survivors.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};