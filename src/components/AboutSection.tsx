import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Second Chance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designed by a team with hardtech, finance, and neuroscience backgrounds, 
            Second Chance Innovations is trying to leapfrog post stroke injury to 
            equalize the strength and mobility deficit.
          </p>
        </motion.div>
        
        {/* Mission Statement */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-accent/10 border-primary/20">
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                We believe that stroke shouldn't define your independence. Through innovative 
                assistive technology and personalized rehabilitation approaches, we're working 
                to restore confidence and capability to stroke survivors worldwide.
              </p>
            </div>
          </Card>
        </motion.div>
        
        {/* Team Background */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Multidisciplinary Expertise</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team combines expertise in hardware technology, financial modeling, 
            and neuroscience research to create solutions that truly understand the 
            complexities of stroke rehabilitation.
          </p>
        </motion.div>
        
        {/* Contact Section */}
        <motion.div 
          id="contact" 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>info@secchance.com</span>
            </Button>
            
            <Button 
              className="bg-gradient-primary hover:opacity-90 flex items-center space-x-2"
              size="lg"
            >
              <Linkedin className="w-5 h-5" />
              <span>Follow on LinkedIn</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};