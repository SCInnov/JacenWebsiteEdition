import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { Button } from "@/components/ui/button";
import { RotateCcw, Palette, Zap, Heart, ArrowRight, Loader2 } from "lucide-react";
import * as THREE from 'three';

const ModelDisplay = ({ useOriginalMaterials }: { useOriginalMaterials: boolean }) => {
  const gltf = useLoader(GLTFLoader, '/SecondArmModel1.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (gltf && modelRef.current) {
      const model = gltf.scene.clone();
      
      // Clear previous children
      while (modelRef.current.children.length > 0) {
        modelRef.current.remove(modelRef.current.children[0]);
      }
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      model.scale.setScalar(scale);
      
      // Apply materials
      let materialCount = 0;
      const meshColors = [
        0x006d8f, // Company Blue
        0xff6b6b, // Coral Red
        0x4ecdc4, // Teal
        0x45b7d1, // Sky Blue
        0x96ceb4, // Sage Green
        0xffeaa7, // Warm Yellow
        0xdda0dd, // Plum
        0x98d8c8  // Mint
      ];
      
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (!useOriginalMaterials) {
            const colorIndex = materialCount % meshColors.length;
            const meshColor = meshColors[colorIndex];
            
            child.material = new THREE.MeshStandardMaterial({
              color: meshColor,
              metalness: 0.3,
              roughness: 0.4,
              envMapIntensity: 1,
            });
          }
          materialCount++;
        }
      });
      
      modelRef.current.add(model);
    }
  }, [gltf, useOriginalMaterials]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return <group ref={modelRef} />;
};

export const ModelViewer = () => {
  const [useOriginalMaterials, setUseOriginalMaterials] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleMaterials = () => {
    setUseOriginalMaterials(!useOriginalMaterials);
  };

  return (
    <section className="relative min-h-screen bg-background">
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div 
          className="pt-24 pb-8 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-thin text-foreground mb-4 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Second-Arm
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A revolutionary assistive device that restores independence and transforms lives through innovative technology.
            </motion.p>
          </div>
        </motion.div>

        {/* 3D Model Section */}
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-10" />
          
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ height: '70vh' }}
            onCreated={() => setLoading(false)}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            
            <Environment preset="studio" />
            
            <ModelDisplay useOriginalMaterials={useOriginalMaterials} />
            
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={8}
              autoRotate={false}
              dampingFactor={0.05}
              enableDamping
            />
          </Canvas>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4 mx-auto" />
                <p className="text-lg font-medium text-foreground">Loading 3D Model...</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="px-6 pb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Technology</h3>
                <p className="text-muted-foreground leading-relaxed">Cutting-edge engineering meets intuitive design for seamless integration into daily life.</p>
              </div>
              
              <div className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Life-Changing Impact</h3>
                <p className="text-muted-foreground leading-relaxed">Restoring independence and confidence through innovative assistive technology solutions.</p>
              </div>
              
              <div className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <RotateCcw className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Experience</h3>
                <p className="text-muted-foreground leading-relaxed">Explore the device in 3D - drag to rotate, scroll to zoom, and discover every detail.</p>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 shadow-lg rounded-full"
                >
                  Learn More About Second-Arm <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleMaterials}
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/30 rounded-full px-6 py-4"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  {useOriginalMaterials ? 'Custom Colors' : 'Original Materials'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};