import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Activity, Shield, Gauge, Wifi, Battery } from "lucide-react";

const techFeatures = [
  {
    icon: Activity,
    title: "EMG Muscle Sensors",
    description: "Advanced electromyography sensors detect muscle signals and translate them into precise device movements.",
    badge: "Machine Learning",
    details: ["Real-time signal processing", "Adaptive learning algorithms", "Personalized calibration"]
  },
  {
    icon: Cpu,
    title: "Intelligent Processing",
    description: "Custom algorithms process muscle signals and adapt to different stroke patterns and severity levels.",
    badge: "AI-Powered",
    details: ["Pattern recognition", "Predictive assistance", "Continuous optimization"]
  },
  {
    icon: Shield,
    title: "Safety Systems",
    description: "Multiple safety mechanisms ensure user protection with automatic disengagement and fail-safes.",
    badge: "2x Safety Factor",
    details: ["Force limiting", "Emergency stops", "Stability monitoring"]
  },
  {
    icon: Gauge,
    title: "Performance Monitoring",
    description: "Real-time tracking of progress, range of motion, and strength improvements over time.",
    badge: "Progress Tracking",
    details: ["Milestone detection", "Therapy insights", "Recovery analytics"]
  }
];

export const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Device That <span className="bg-gradient-primary bg-clip-text text-transparent">Learns</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced technology stack combines muscle sensing, machine learning, 
            and safety systems to create a truly adaptive rehabilitation experience.
          </p>
        </div>
        
        {/* Technology Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {techFeatures.map((tech, index) => (
            <Card key={index} className="p-6 hover:shadow-card transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-gradient-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                    <tech.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{tech.title}</h3>
                    <Badge variant="secondary" className="mt-1">{tech.badge}</Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {tech.description}
              </p>
              
              <div className="space-y-2">
                {tech.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Technical Specifications */}
        <div className="bg-gradient-accent/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-2xl font-semibold text-center mb-8">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Gauge className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">110°</div>
              <div className="text-sm text-muted-foreground">Range of Motion</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">15 lbs</div>
              <div className="text-sm text-muted-foreground">Lift Capacity</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">&lt; 1s</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">2x</div>
              <div className="text-sm text-muted-foreground">Safety Factor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};