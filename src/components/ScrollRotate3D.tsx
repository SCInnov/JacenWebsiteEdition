import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { applyMedicalDeviceColors } from '../utils/modelColors';

interface ScrollRotate3DProps {
  modelPath: string;
  className?: string;
  rotationSpeed?: number;
  blurIntensity?: number;
}

export const ScrollRotate3D = ({ 
  modelPath, 
  className = "",
  rotationSpeed = 0.5,
  blurIntensity = 0.3
}: ScrollRotate3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isInViewRef = useRef<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [shouldShowModel, setShouldShowModel] = useState(true);
  const [dominantColor, setDominantColor] = useState("#000000");
  const [scrollBlurIntensity, setScrollBlurIntensity] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Initial check
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    // Camera setup - adjusted for better view of Y movement
    const camera = new THREE.PerspectiveCamera(
      60, // Reduced FOV for better view
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2); // Moved camera back and centered for better Y movement view

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Force the canvas to be behind other elements
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.display = 'block';
    
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 0.5, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);



    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(0.065625); // Decreased by 25% (0.0875 * 0.75 = 0.065625)
        model.position.set(0, 0, 0);
        model.castShadow = true;
        model.receiveShadow = true;
        
        // Apply medical device colors using shared function
        applyMedicalDeviceColors(model, 'ScrollRotate3D');
        
        // Center the model properly for rotation - more robust approach
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Create a group to hold the model for better centering control
        const modelGroup = new THREE.Group();
        
        // Center the model within the group
        model.position.sub(center);
        
        // Add model to group
        modelGroup.add(model);
        
        // Position the group at the center of the screen initially
        modelGroup.position.set(0, -1.5, 0);
        
        // Store the orbit radius for Z-axis rotation around center
        const orbitRadius = 1.0; // Distance from center to orbit around (reduced for better centering)
        
        // Set initial position at center (no orbit)
        const initialAngle = -205 * Math.PI / 180;
        modelGroup.position.x = 0; // Center horizontally
        modelGroup.position.z = 0; // Center horizontally
        modelGroup.position.y = -1.5; // Ensure Y position is set
        
        // Set the same orientation as the other 3D model (270 degrees around X-axis)
        model.rotation.x = (3 * Math.PI) / 2; // 270 degrees in radians
        
        // Set group rotation to maintain original orientation with 110° Y rotation (95° + 15°)
        modelGroup.rotation.y = initialAngle + Math.PI / 2 + (110 * Math.PI) / 180; // Add 110 degrees Y rotation
        modelGroup.rotation.x = 0; // Reset X rotation
        modelGroup.rotation.z = 0; // Reset Z rotation
        
        // Use the group as the main model reference
        scene.add(modelGroup);
        modelRef.current = modelGroup;
        
             // Make model visible immediately
             model.visible = true;
             
             // Use the dark gray color from the medical device color scheme
             const deviceDarkGrayColor = "#333333"; // This matches medicalColors.accent (dark gray) from modelColors.ts
             console.log('Using device dark gray color:', deviceDarkGrayColor);
             setDominantColor(deviceDarkGrayColor);
             
             // Immediately apply scroll-based rotation after model is ready
             setTimeout(() => {
               if (modelRef.current) {
                 handleScroll();
                 console.log('Model positioned and visible');
                 setIsModelReady(true);
               }
             }, 50);
        
        // Fallback timeout to ensure component becomes visible
        setTimeout(() => {
          if (!isModelReady) {
            console.warn('Model loading timeout - making component visible anyway');
            setIsModelReady(true);
          }
        }, 5000); // 5 second timeout
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        // Set model as ready even if there's an error to prevent white screen
        setIsModelReady(true);
      }
    );

    // Function to create gradient blur overlays
    const createBlurOverlays = (leftBlur: number, rightBlur: number, bottomBlur: number) => {
      if (!mountRef.current) return;
      
      // Remove existing overlays
      const existingOverlays = mountRef.current.querySelectorAll('.blur-overlay');
      existingOverlays.forEach(overlay => overlay.remove());
      
      // Create left blur overlay (more emphasis, extends over 3D device)
      const leftOverlay = document.createElement('div');
      leftOverlay.className = 'blur-overlay';
      leftOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(to right, rgba(0,0,0,0.8), transparent);
        backdrop-filter: blur(${leftBlur}px);
        pointer-events: none;
        z-index: 15;
      `;
      mountRef.current.appendChild(leftOverlay);
      
      // Create right blur overlay (extends over 3D device)
      const rightOverlay = document.createElement('div');
      rightOverlay.className = 'blur-overlay';
      rightOverlay.style.cssText = `
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
        height: 100%;
        background: linear-gradient(to left, rgba(0,0,0,0.6), transparent);
        backdrop-filter: blur(${rightBlur}px);
        pointer-events: none;
        z-index: 15;
      `;
      mountRef.current.appendChild(rightOverlay);
      
      // Create bottom blur overlay (extends over 3D device)
      const bottomOverlay = document.createElement('div');
      bottomOverlay.className = 'blur-overlay';
      bottomOverlay.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35%;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        backdrop-filter: blur(${bottomBlur}px);
        pointer-events: none;
        z-index: 15;
      `;
      mountRef.current.appendChild(bottomOverlay);
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Just render the scene - position is handled by scroll events
      renderer.render(scene, camera);
    };
    animate();

    // Scroll event handler
    const handleScroll = () => {
      if (!mountRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Find the HeroSection to determine when to start zoom effect
      const heroSection = document.querySelector('#hero');
      const heroHeight = heroSection ? heroSection.getBoundingClientRect().height : windowHeight;
      
      // Calculate scroll progress within HeroSection for blur effect
      const heroScrollProgress = Math.min(scrollY / heroHeight, 1);
      const heroBlurIntensity = heroScrollProgress * 10; // Max blur of 10px
      setScrollBlurIntensity(heroBlurIntensity);
      
      // Find the StatsSection for color application
      const statsSection = document.querySelector('#stats, [data-section="stats"]');
      
      // Calculate scroll progress after HeroSection
      const heroProgress = Math.max(0, (scrollY - heroHeight) / (document.documentElement.scrollHeight - heroHeight - windowHeight));
      const heroProgressClamped = Math.min(heroProgress, 1);
      
      // Use overall page scroll for basic movement
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      // Hide model based on scroll progress
      let modelShouldShow = true;
      if (scrollProgress > 0.3) {
        modelShouldShow = false;
      }
      
      setShouldShowModel(modelShouldShow);
      
      if (modelRef.current) {
        modelRef.current.visible = modelShouldShow;
        
        const baseAngle = -205 * Math.PI / 180;
        let x, z, y;
        
        x = 0;
        y = -0.5 - scrollProgress * 2;
        z = 0;
        
        if (scrollProgress > 0.3 && modelRef.current) {
          modelRef.current.visible = false;
        }
        
        if (modelRef.current) {
          modelRef.current.position.set(x, y, z);
        }
        
        modelRef.current.scale.setScalar(0.1);
        
        const rotationAmount = scrollProgress * Math.PI * 2;
        modelRef.current.rotation.y = baseAngle + Math.PI / 2 + (110 * Math.PI) / 180 + rotationAmount;
        modelRef.current.rotation.x = 0;
        modelRef.current.rotation.z = 0;
        
        if (heroProgressClamped > 0) {
          camera.position.z = 2 - heroProgressClamped * 1.5;
        } else {
          camera.position.z = 2;
        }
        
        if (heroProgressClamped > 0.8 && statsSection) {
          const nextSection = statsSection as HTMLElement;
          nextSection.style.backgroundColor = dominantColor;
          nextSection.style.transition = 'background-color 1s ease-in-out';
        }
      }
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Event listeners - delay scroll listener to ensure initial orientation is set
    setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
    }, 100);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Clean up blur effects from content elements
      if (mountRef.current) {
        const contentElements = mountRef.current.querySelectorAll('.blur-content');
        contentElements.forEach((element) => {
          (element as HTMLElement).style.filter = '';
        });
        
        // Remove blur overlays
        const existingOverlays = mountRef.current.querySelectorAll('.blur-overlay');
        existingOverlays.forEach(overlay => overlay.remove());
      }
    };
  }, [modelPath, rotationSpeed, blurIntensity]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000 ease-in-out ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
        opacity: isModelReady && shouldShowModel ? (isDarkMode ? 0.3 : 0.15) : (isDarkMode ? 0.1 : 0.05), // Theme-specific opacity
        filter: `blur(${scrollBlurIntensity}px)`, // Progressive blur based on scroll
        transition: 'filter 0.1s ease-out' // Smooth blur transition
      }}
    >
    </div>
  );
};
