import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Users, Heart, Award } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Second Chance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designed by a team with hardtech, finance, and neuroscience backgrounds, 
            Second Chance Innovations is trying to leapfrog post stroke injury to 
            equalize the strength and mobility deficit.
          </p>
        </div>
        
        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
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
        </div>
        
        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <div className="text-3xl font-bold text-primary mb-2">11.6M</div>
            <div className="text-muted-foreground">Hemiparesis Patients in US</div>
            <div className="text-sm text-muted-foreground mt-1">(2025 projection)</div>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
            <Heart className="w-10 h-10 text-destructive mx-auto mb-4" />
            <div className="text-3xl font-bold text-destructive mb-2">71%</div>
            <div className="text-muted-foreground">Experience Depression</div>
            <div className="text-sm text-muted-foreground mt-1">Post-treatment</div>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
            <Award className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-secondary mb-2">#1</div>
            <div className="text-muted-foreground">Leading Cause</div>
            <div className="text-sm text-muted-foreground mt-1">Of disability in US</div>
          </Card>
        </div>
        
        {/* Team Background */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-4">Multidisciplinary Expertise</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team combines expertise in hardware technology, financial modeling, 
            and neuroscience research to create solutions that truly understand the 
            complexities of stroke rehabilitation.
          </p>
        </div>
        
        {/* Contact Section */}
        <div id="contact" className="text-center">
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
        </div>
      </div>
    </section>
  );
};