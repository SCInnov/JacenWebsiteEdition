import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Bell, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const ContactSection = () => {
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('info@secchance.com');
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'info@secchance.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen flex items-center justify-center bg-background relative transition-all duration-1000 ease-in-out py-16"
    >
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div 
            className="mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Ready to learn more about Second Chance Innovations? 
              We'd love to hear from you and discuss how we can help.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Email Contact */}
            <motion.div 
              className="border-2 border-green-200 dark:border-green-800 rounded-lg p-5 sm:p-6 md:p-8 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 min-h-[260px] sm:min-h-[280px] flex flex-col justify-center"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.02)' }}
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Email Us</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Click to copy our email address and send us a message. We'll get back to you within 24 hours.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="bg-gradient-primary hover:opacity-90 w-full transition-all duration-300"
                  size="lg"
                  onClick={handleEmailClick}
                >
                  {!isEmailCopied && <Mail className="w-5 h-5 mr-2" />}
                  {isEmailCopied && <Check className="w-5 h-5 mr-2" />}
                  {isEmailCopied ? 'Copied!' : 'info@secchance.com'}
                </Button>
              </motion.div>
            </motion.div>

            {/* LinkedIn Contact */}
            <motion.div 
              className="border-2 border-green-200 dark:border-green-800 rounded-lg p-5 sm:p-6 md:p-8 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 min-h-[260px] sm:min-h-[280px] flex flex-col justify-center"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.02)' }}
              whileHover={{ scale: 1.02 }}
            >
              <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Connect on LinkedIn</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Follow our journey and stay updated with our latest developments.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="bg-gradient-primary hover:opacity-90 w-full transition-all duration-300"
                  size="lg"
                  onClick={() => window.open('https://www.linkedin.com/company/second-chance-innovations/', '_blank')}
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Follow Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div 
              className="border-2 border-green-200 dark:border-green-800 rounded-lg p-5 sm:p-6 md:p-8 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 min-h-[260px] sm:min-h-[280px] flex flex-col justify-center"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.02)' }}
              whileHover={{ scale: 1.02 }}
            >
              <Bell className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Newsletter</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Get updates on our latest developments and stroke rehabilitation breakthroughs.
              </p>
              <div className="space-y-2 sm:space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-gradient-primary hover:opacity-90 w-full transition-all duration-300 text-sm sm:text-base">
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto px-4">
              Whether you're a stroke survivor, caregiver, healthcare professional, or investor, 
              we're here to answer your questions and explore how Second Chance can make a difference.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
