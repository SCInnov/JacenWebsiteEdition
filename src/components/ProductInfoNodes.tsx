import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Activity, Shield, Gauge, X, Play } from "lucide-react";

interface InfoNode {
  id: string;
  title: string;
  description: string;
  position: { x: string; y: string };
  triggerScrollProgress: number;
  icon: any;
  badge: string;
  details: string[];
  hasVideo: boolean;
  videoPath?: string;
}

const productInfoNodes: InfoNode[] = [
  {
    id: 'emg-sensors',
    title: 'EMG Muscle Sensors',
    description: 'Advanced electromyography sensors detect muscle signals and translate them into precise device movements with real-time processing.',
    position: { x: '30%', y: '40%' },
    triggerScrollProgress: 0.1,
    icon: Activity,
    badge: 'Machine Learning',
    details: ['Real-time signal processing', 'Adaptive learning algorithms', 'Personalized calibration'],
    hasVideo: true,
    videoPath: '/EMGSensors.mp4'
  },
  {
    id: 'intelligent-processing',
    title: 'Intelligent Processing',
    description: 'Custom AI algorithms process muscle signals and adapt to different stroke patterns with pattern recognition and predictive assistance.',
    position: { x: '65%', y: '30%' },
    triggerScrollProgress: 0.2,
    icon: Cpu,
    badge: 'AI-Powered',
    details: ['Pattern recognition', 'Predictive assistance', 'Continuous optimization'],
    hasVideo: false
  },
  {
    id: 'safety-systems',
    title: 'Safety Systems',
    description: 'Multiple safety mechanisms ensure user protection with automatic disengagement, force limiting, and emergency stops.',
    position: { x: '70%', y: '60%' },
    triggerScrollProgress: 0.3,
    icon: Shield,
    badge: '2x Safety Factor',
    details: ['Force limiting', 'Emergency stops', 'Stability monitoring'],
    hasVideo: false
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring',
    description: 'Real-time tracking of progress, range of motion, and strength improvements with milestone detection and recovery analytics.',
    position: { x: '25%', y: '65%' },
    triggerScrollProgress: 0.4,
    icon: Gauge,
    badge: 'Progress Tracking',
    details: ['Milestone detection', 'Therapy insights', 'Recovery analytics'],
    hasVideo: true,
    videoPath: '/Track your progress.mp4'
  }
];

interface ProductInfoNodesProps {
  scrollProgress: number;
  isVisible: boolean;
}

export const ProductInfoNodes = ({ scrollProgress, isVisible }: ProductInfoNodesProps) => {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<InfoNode | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const newActiveNodes = productInfoNodes
      .filter(node => scrollProgress >= node.triggerScrollProgress && scrollProgress <= 0.6)
      .map(node => node.id);
    
    setActiveNodes(newActiveNodes);
  }, [scrollProgress]);

  const handleNodeClick = (node: InfoNode) => {
    setSelectedNode(node);
    if (node.hasVideo && node.videoPath) {
      setShowVideo(true);
      setVideoPlayed(false);
    } else {
      setShowVideo(false);
      setVideoPlayed(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
    setShowVideo(false);
    setVideoPlayed(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setVideoPlayed(true);
  };

  // Control video playback
  useEffect(() => {
    if (videoRef.current && showVideo && selectedNode?.hasVideo) {
      videoRef.current.play().catch(console.error);
    }
  }, [showVideo, selectedNode]);

  if (!isVisible) return null;

  return (
    <>
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
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.3
                    }
                  } : { 
                    opacity: 0, 
                    scale: 0,
                    transition: { 
                      duration: 0.4,
                      ease: "easeIn"
                    }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div 
                        className="relative cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleNodeClick(node)}
                      >
                        {/* Animated outer rings */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary/30 -m-4"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border border-primary/20 -m-3"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                        
                        {/* Gradient background glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 -m-2 blur-sm" />
                        
                        {/* Main interactive node */}
                        <div className="relative w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full border-3 border-background shadow-2xl hover:shadow-primary/50 transition-all duration-300">
                          {/* Icon inside */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <node.icon className="w-4 h-4 text-white" />
                          </div>
                          
                          {/* Video indicator */}
                          {node.hasVideo && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-background flex items-center justify-center">
                              <Play className="w-1.5 h-1.5 text-white fill-white" />
                            </div>
                          )}
                          
                          {/* Pulsing inner light */}
                          <div className="absolute inset-2 bg-white/30 rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    
                    <TooltipContent 
                      side="right" 
                      className="max-w-sm p-4 bg-card/98 backdrop-blur-md border-2 border-primary/30 shadow-xl rounded-xl pointer-events-none"
                      sideOffset={20}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <node.icon className="w-4 h-4 text-primary" />
                          <h4 className="font-bold text-sm text-foreground">{node.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{node.description}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="secondary" className="text-xs">{node.badge}</Badge>
                          {node.hasVideo && <span className="text-xs text-red-500 font-medium">● Video Available</span>}
                        </div>
                        <p className="text-xs text-primary font-medium">Click to explore →</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </TooltipProvider>

      {/* Modal for video and notecard */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-10"
                onClick={handleCloseModal}
              >
                <X className="w-8 h-8" />
              </button>

              {/* Video Section */}
              {showVideo && selectedNode.hasVideo && selectedNode.videoPath && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <video 
                    ref={videoRef}
                    className="w-full h-auto rounded-xl shadow-2xl"
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    onEnded={handleVideoEnd}
                  >
                    <source src={selectedNode.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              )}

              {/* Notecard Section */}
              {(!showVideo || videoPlayed) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: showVideo ? 0.3 : 0.2 }}
                >
                  <Card className="p-8 bg-card/95 backdrop-blur-sm border-2 border-primary/20">
                    <div className="text-center mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary mx-auto mb-4 w-fit">
                        <selectedNode.icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">{selectedNode.title}</h3>
                      <Badge variant="secondary" className="text-sm px-3 py-1">{selectedNode.badge}</Badge>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center max-w-2xl mx-auto">
                      {selectedNode.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedNode.details.map((detail, index) => (
                        <div 
                          key={index} 
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-primary/10"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};