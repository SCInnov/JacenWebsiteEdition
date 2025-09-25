import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InfoNode {
  id: string;
  title: string;
  description: string;
  position: { x: string; y: string };
  triggerScrollProgress: number;
}

const productInfoNodes: InfoNode[] = [
  {
    id: 'emg-sensors',
    title: 'EMG Muscle Sensors',
    description: 'Advanced electromyography sensors detect muscle signals and translate them into precise device movements with real-time processing.',
    position: { x: '30%', y: '40%' },
    triggerScrollProgress: 0.1
  },
  {
    id: 'intelligent-processing',
    title: 'Intelligent Processing',
    description: 'Custom AI algorithms process muscle signals and adapt to different stroke patterns with pattern recognition and predictive assistance.',
    position: { x: '65%', y: '30%' },
    triggerScrollProgress: 0.15
  },
  {
    id: 'safety-systems',
    title: 'Safety Systems',
    description: 'Multiple safety mechanisms ensure user protection with automatic disengagement, force limiting, and emergency stops.',
    position: { x: '70%', y: '60%' },
    triggerScrollProgress: 0.2
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring',
    description: 'Real-time tracking of progress, range of motion, and strength improvements with milestone detection and recovery analytics.',
    position: { x: '25%', y: '65%' },
    triggerScrollProgress: 0.25
  }
];

interface ProductInfoNodesProps {
  scrollProgress: number;
  isVisible: boolean;
}

export const ProductInfoNodes = ({ scrollProgress, isVisible }: ProductInfoNodesProps) => {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  useEffect(() => {
    const newActiveNodes = productInfoNodes
      .filter(node => scrollProgress >= node.triggerScrollProgress && scrollProgress <= 0.4)
      .map(node => node.id);
    
    setActiveNodes(newActiveNodes);
  }, [scrollProgress]);

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <div className="fixed inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {productInfoNodes.map((node) => {
            const isActive = activeNodes.includes(node.id);
            
            return (
              <motion.div
                key={node.id}
                className="absolute pointer-events-auto"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.2
                  }
                } : { 
                  opacity: 0, 
                  scale: 0,
                  transition: { 
                    duration: 0.3,
                    ease: "easeIn"
                  }
                }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Pulsing outer ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20 -m-2"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Main node - larger for accessibility */}
                      <div className="w-6 h-6 bg-primary rounded-full border-3 border-background shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-3 h-3 bg-primary-foreground rounded-full m-0.75 animate-pulse" />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  
                  <TooltipContent 
                    side="right" 
                    className="max-w-sm p-6 bg-card/98 backdrop-blur-md border-2 border-primary/30 shadow-xl rounded-xl"
                    sideOffset={20}
                  >
                    <div className="space-y-3">
                      <h4 className="font-bold text-lg text-foreground tracking-tight">{node.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{node.description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};