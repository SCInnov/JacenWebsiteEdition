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
    id: 'support-system',
    title: 'Advanced Support System',
    description: 'Ergonomic design provides stable support for daily activities with adaptive strength enhancement.',
    position: { x: '25%', y: '35%' },
    triggerScrollProgress: 0.1
  },
  {
    id: 'sensors',
    title: 'Smart Sensors',
    description: 'EMG sensors detect muscle activity and adjust assistance levels in real-time for optimal performance.',
    position: { x: '70%', y: '45%' },
    triggerScrollProgress: 0.15
  },
  {
    id: 'comfort-grip',
    title: 'Comfort Grip',
    description: 'Soft, medical-grade materials ensure comfortable extended use while maintaining secure control.',
    position: { x: '45%', y: '65%' },
    triggerScrollProgress: 0.2
  },
  {
    id: 'power-unit',
    title: 'Compact Power Unit',
    description: 'Long-lasting battery with wireless charging capability provides all-day assistance without interruption.',
    position: { x: '30%', y: '55%' },
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
      .filter(node => scrollProgress >= node.triggerScrollProgress && scrollProgress <= 0.3)
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
                      
                      {/* Main node */}
                      <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg cursor-pointer">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full m-0.5 animate-pulse" />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  
                  <TooltipContent 
                    side="right" 
                    className="max-w-xs p-4 bg-card/95 backdrop-blur-sm border-primary/20"
                    sideOffset={15}
                  >
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">{node.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{node.description}</p>
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