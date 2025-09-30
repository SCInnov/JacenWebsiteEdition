import { Card } from "@/components/ui/card";
import { Users, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

export const StatsSection = () => {
  return (
    <section 
      id="stats" 
      className="h-screen flex items-center justify-center bg-background relative transition-all duration-1000 ease-in-out"
    >
      {/* Transition gradient from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-[-1]" />
      
      {/* Subtle grid pattern - matching other sections */}
      <div className="absolute inset-0 opacity-4 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-6 py-16 pt-32 sm:pt-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The <span style={{ color: '#afc8a0' }}>Challenge</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stroke affects millions of lives, creating significant challenges for survivors 
            and their families. Understanding the scope helps us build better solutions.
          </p>
        </motion.div>
        
        {/* Key Statistics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-6 md:gap-10 lg:gap-16 max-w-6xl mx-auto"
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
              className="p-1 sm:p-3 md:p-5 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(21, 128, 61, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(21, 128, 61, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Users className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-700 dark:text-green-300 mx-auto mb-1 sm:mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-700 dark:text-green-300 mb-0.5 sm:mb-1 md:mb-2 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-200">11.6M</div>
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
              className="p-1 sm:p-3 md:p-5 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(37, 99, 235, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-600 dark:text-blue-400 mx-auto mb-1 sm:mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1 md:mb-2 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-300">71%</div>
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
              className="p-1 sm:p-3 md:p-5 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(147, 51, 234, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Award className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-600 dark:text-purple-400 mx-auto mb-1 sm:mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-0.5 sm:mb-1 md:mb-2 transition-colors duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-300">#1</div>
              <div className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Leading Cause</div>
              <div className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">Of disability in US</div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};
