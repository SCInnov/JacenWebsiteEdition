import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { Button } from "@/components/ui/button";
import { RotateCcw, Palette, Zap, Heart, ArrowRight, Loader2 } from "lucide-react";

export const ModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [useOriginalMaterials, setUseOriginalMaterials] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup - iPhone-style dramatic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(10, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6699ff, 0.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff9999, 0.8);
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // Controls (manual implementation for smooth interaction)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      targetRotation.y += deltaMove.x * 0.01;
      targetRotation.x += deltaMove.y * 0.01;
      targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (event: WheelEvent) => {
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    let model: THREE.Group | null = null;

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      '/SecondArmModel1.glb',
      (gltf) => {
        console.log('✅ Model loaded successfully');
        model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.setScalar(scale);
        
        // Apply materials
        let materialCount = 0;
        const colors = [
          0x006d8f, // Primary blue
          0xff6b6b, // Coral
          0x4ecdc4, // Teal
          0x45b7d1, // Sky blue
          0x96ceb4, // Sage
          0xffeaa7, // Warm yellow
          0xdda0dd, // Plum
          0x98d8c8  // Mint
        ];
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (!useOriginalMaterials) {
              const color = colors[materialCount % colors.length];
              child.material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.4,
                roughness: 0.3,
                envMapIntensity: 1,
              });
            }
            child.castShadow = true;
            child.receiveShadow = true;
            materialCount++;
          }
        });
        
        scene.add(model);
        setLoading(false);
      },
      (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setProgress(percent);
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation interpolation
      rotation.x += (targetRotation.x - rotation.x) * 0.1;
      rotation.y += (targetRotation.y - rotation.y) * 0.1;
      
      if (model) {
        model.rotation.x = rotation.x;
        model.rotation.y = rotation.y;
        
        // Subtle floating animation
        model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
    };
  }, [useOriginalMaterials]);

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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none z-10" />
          
          <div 
            ref={containerRef} 
            className="h-[70vh] relative cursor-grab active:cursor-grabbing"
            style={{ 
              background: 'radial-gradient(circle at center, hsl(var(--muted)/0.3) 0%, hsl(var(--background)) 70%)'
            }}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4 mx-auto" />
                  <p className="text-lg font-medium text-foreground mb-2">Loading 3D Model...</p>
                  <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                <div className="text-center p-6 bg-card rounded-lg border shadow-lg max-w-md">
                  <p className="text-destructive mb-4 font-medium">Model Loading Error</p>
                  <p className="text-muted-foreground text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
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