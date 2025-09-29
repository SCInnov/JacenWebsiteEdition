import { Card } from "@/components/ui/card";
import { Users, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

export const StatsSection = () => {
  return (
    <section id="stats" className="h-screen flex items-center justify-center bg-background relative transition-all duration-1000 ease-in-out">
      {/* Dark gray device background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/30 via-gray-700/50 to-gray-900/70 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/40 via-transparent to-gray-600/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 via-transparent to-gray-600/30 z-0" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 z-1" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Challenge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stroke affects millions of lives, creating significant challenges for survivors 
            and their families. Understanding the scope helps us build better solutions.
          </p>
        </motion.div>
        
        {/* Key Statistics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-8 text-center bg-card border rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <Users className="w-10 h-10 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-3xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/90">11.6M</div>
              <div className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Hemiparesis Patients in US</div>
              <div className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">(2025 projection)</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-8 text-center bg-card border rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <Heart className="w-10 h-10 text-blue-500 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-3xl font-bold text-blue-500 mb-2 transition-colors duration-300 group-hover:text-blue-400">71%</div>
              <div className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Experience Depression</div>
              <div className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">Post-treatment</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-8 text-center bg-card border rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(100, 116, 139, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(100, 116, 139, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <Award className="w-10 h-10 text-secondary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-3xl font-bold text-secondary mb-2 transition-colors duration-300 group-hover:text-secondary/90">#1</div>
              <div className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Leading Cause</div>
              <div className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">Of disability in US</div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};
