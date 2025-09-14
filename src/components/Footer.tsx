import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">SC</span>
              </div>
              <span className="font-semibold text-lg">Second Chance</span>
            </div>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Reimagining stroke care through innovative assistive technology 
              that helps people regain their independence.
            </p>
            <div className="flex items-center space-x-2 text-blue-200">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Restoring Independence</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-blue-100 hover:text-white transition-colors">
                Features
              </a>
              <a href="#technology" className="block text-blue-100 hover:text-white transition-colors">
                Technology
              </a>
              <a href="#about" className="block text-blue-100 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#contact" className="block text-blue-100 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="justify-start p-0 text-blue-100 hover:text-white hover:bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                info@secchance.com
              </Button>
              
              <Button 
                variant="ghost"
                className="justify-start p-0 text-blue-100 hover:text-white hover:bg-transparent"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-400/20 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © 2024 Second Chance Innovations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};