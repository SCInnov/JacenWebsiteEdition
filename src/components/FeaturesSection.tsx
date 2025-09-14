import { Card } from "@/components/ui/card";
import { Brain, Shield, Zap, Target, Settings, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Machine Learning Adaptation",
    description: "EMG sensors use machine learning to iterate and improve, providing personalized assistance that adapts to your unique stroke pattern.",
    color: "text-medical-blue"
  },
  {
    icon: Zap,
    title: "Enhanced Strength",
    description: "10-15 lbs of lift capacity with adaptable modes for every stroke, helping you regain confidence in daily activities.",
    color: "text-medical-teal"
  },
  {
    icon: Shield,
    title: "Safety & Stability",
    description: "110° range of motion with automatic disengagement and 2x safety factor for the advertised carrying capacity.",
    color: "text-medical-blue"
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Secondary sensors adapt to different stroke types, ensuring the device works effectively for your specific rehabilitation needs.",
    color: "text-medical-teal"
  },
  {
    icon: Settings,
    title: "Easy Setup",
    description: "Users can put the device on in seconds, making it practical for daily use without complex setup procedures.",
    color: "text-medical-blue"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Constant tracking of patient's progress to show milestones and provide motivation throughout the rehabilitation journey.",
    color: "text-medical-teal"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="bg-gradient-primary bg-clip-text text-transparent">Second-Arm</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary assistive device that adapts to you, enhances your strength, 
            and provides safe, stable support for daily activities.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-primary/10 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Key Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">Adapts to You</div>
            <p className="text-muted-foreground">Personalized assistance for every patient</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">Enhanced Strength</div>
            <p className="text-muted-foreground">Regain confidence in daily activities</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">Safe and Stable</div>
            <p className="text-muted-foreground">Built with safety as the top priority</p>
          </div>
        </div>
      </div>
    </section>
  );
};