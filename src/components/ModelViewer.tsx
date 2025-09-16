import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

export const ModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [useOriginalMaterials] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Match website background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Much closer to the model

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = false; // Disabled shadows for cleaner view
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = false; // Disabled shadows
    scene.add(directionalLight);

    const light2 = new THREE.DirectionalLight(0xffffff, 2.0);
    light2.position.set(-5, -10, -7.5);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x006d8f, 0.5, 100);
    light3.position.set(0, 0, 5);
    scene.add(light3);
    
    // Ground plane removed for cleaner view

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false; // Disabled auto-rotation - model stays still
    controls.autoRotateSpeed = 0.3; // Slower rotation for better viewing
    controls.minDistance = 2; // Minimum zoom distance
    controls.maxDistance = 20; // Maximum zoom distance
    controls.enablePan = true; // Allow panning
    controls.enableZoom = true; // Allow zooming
    controls.enableRotate = true; // Allow rotation

            // Add a test cube first (will be removed when model loads)
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({ color: 0x006d8f });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            scene.add(cube);

    // Load the GLB/GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/SecondArmModel1.glb', // Try GLB first
      (gltf) => {
        console.log('✅ GLB Model loaded successfully:', gltf);
        const model = gltf.scene;
        console.log('Model scene:', model);
        console.log('Number of children:', model.children.length);

        // Check if model has any geometry
        let hasGeometry = false;
        let meshCount = 0;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.geometry) {
            hasGeometry = true;
            meshCount++;
            console.log(`Found mesh ${meshCount} with geometry:`, child.geometry);
            console.log(`Mesh vertices: ${child.geometry.attributes.position?.count || 'unknown'}`);
          }
        });

        console.log(`Total meshes found: ${meshCount}`);

        if (!hasGeometry) {
          console.warn('⚠️ Model loaded but has no geometry, keeping test cubes');
          setError('Model loaded but has no visible geometry - showing test cubes instead');
          setLoading(false);
          return;
        }

        // Remove the test cube
        scene.remove(cube);

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log('Model bounding box:', { center, size });
        console.log('Box size:', size);

        // Try alternative centering approach for nested structures
        const mesh = model.getObjectByProperty('type', 'Mesh');
        if (mesh) {
          console.log('Found mesh child, centering based on mesh geometry');
          const meshBox = new THREE.Box3().setFromObject(mesh);
          const meshCenter = meshBox.getCenter(new THREE.Vector3());
          mesh.position.sub(meshCenter); // recenters the actual mesh
        } else {
          model.position.sub(center); // Center the model normally
        }

        // Apply uniform scaling to fit model into scene
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        model.scale.setScalar(scale);
        
        // Set default starting rotation (270 degrees around X-axis)
        // Users can rotate freely from this position, it won't snap back until refresh
        model.rotation.x = (3 * Math.PI) / 2; // 270 degrees in radians

        // Recalculate bounding box after scaling and centering
        const newBox = new THREE.Box3().setFromObject(model);
        const newSize = newBox.getSize(new THREE.Vector3());
        const newCenter = newBox.getCenter(new THREE.Vector3());

        // Move model so bottom sits at y=0
        const bottomY = newBox.min.y;
        model.position.y -= bottomY; // Adjust upward

        // Camera distance to fit model based on size
        const fitHeightDistance = newSize.y / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const fitWidthDistance = newSize.x / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const distance = Math.max(fitHeightDistance, fitWidthDistance);

        camera.position.set(1, newSize.y * 0.5, distance * 1.2);
        camera.lookAt(1, newSize.y * 0.5, 0);

        controls.target.set(1, newSize.y * 0.5, 0);
        controls.update();
        
        console.log('🔍 DEBUGGING MODEL VISIBILITY:');
        console.log('Model position after centering:', model.position);
        console.log('Model scale applied:', scale);
        console.log('Model final size:', newSize);
        console.log('Model bottom Y (should be at y=0):', newBox.min.y);
        console.log('Camera distance:', distance);
        console.log('Camera position:', camera.position);
        console.log('Camera target:', controls.target);
        console.log('Ground plane added at y=0 for reference');

        console.log('Model scale:', scale);
        console.log('Scale factor:', scale);

            // Handle materials based on preference
            console.log('Processing materials...');
            let materialCount = 0;
            
            // Define radically different colors for each mesh part
            const meshColors = [
              0xff0000, // Red
              0x00ff00, // Green
              0x0000ff, // Blue
              0x000080, // Dark Blue (was Yellow)
              0x006d8f, // Company Blue (was Magenta)
              0xffffff, // White (was Cyan)
              0xff8000, // Orange
              0x000000  // Black (was Purple)
            ];
            
            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                materialCount++;
                console.log(`Mesh ${materialCount} - Original material:`, child.material);
                console.log(`Material type:`, child.material?.type);
                console.log(`Material color:`, child.material?.color);
                console.log(`Material color hex:`, child.material?.color?.getHexString());
                console.log(`Material map:`, child.material?.map);
                console.log(`Material metallic:`, child.material?.metallic);
                console.log(`Material roughness:`, child.material?.roughness);
                
                if (useOriginalMaterials) {
                  // Keep original materials completely unchanged
                  console.log('Using original materials');
                } else {
                  // Apply different colors to each mesh part
                  const colorIndex = (materialCount - 1) % meshColors.length;
                  const meshColor = meshColors[colorIndex];
                  
                  console.log(`Applying color ${colorIndex + 1} to mesh ${materialCount}: #${meshColor.toString(16)}`);
                  
                  // Create new material with different color for each mesh
                  child.material = new THREE.MeshStandardMaterial({
                    color: meshColor,
                    metalness: 0.8, // More metallic for better reflections
                    roughness: 0.1, // Very smooth and reflective
                    side: THREE.DoubleSide,
                    wireframe: false // Solid material
                  });
                  
                  // Add wireframe edges for better definition
                  const edges = new THREE.EdgesGeometry(child.geometry);
                  const wireframe = new THREE.LineSegments(
                    edges,
                    new THREE.LineBasicMaterial({ 
                      color: 0x000000, // Black wireframe lines
                      linewidth: 1
                    })
                  );
                  child.add(wireframe);
                }
                
                // Shadows disabled for cleaner view
                child.castShadow = false;
                child.receiveShadow = false;
              }
            });

        scene.add(model);
        setLoading(false);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        setProgress(percent);
        console.log('Loading progress:', percent + '%');
      },
      (error) => {
        console.error('❌ Error loading GLB model:', error);
        console.error('Error details:', {
          message: error.message,
          type: error.type,
          target: error.target
        });
        
        // Try GLTF file as fallback
        console.log('Trying GLTF file as fallback...');
        loader.load(
          '/SecondArmModel1.gltf',
          (gltf) => {
            console.log('✅ GLTF Model loaded successfully:', gltf);
            const model = gltf.scene;
            console.log('Model scene:', model);
            console.log('Number of children:', model.children.length);

            // Check if model has any geometry
            let hasGeometry = false;
            let meshCount = 0;
            model.traverse((child) => {
              if (child instanceof THREE.Mesh && child.geometry) {
                hasGeometry = true;
                meshCount++;
                console.log(`Found mesh ${meshCount} with geometry:`, child.geometry);
                console.log(`Mesh vertices: ${child.geometry.attributes.position?.count || 'unknown'}`);
              }
            });

            console.log(`Total meshes found: ${meshCount}`);

            if (!hasGeometry) {
              console.warn('⚠️ Model loaded but has no geometry, keeping test cube');
              setError('Model loaded but has no visible geometry - showing test cube instead');
              setLoading(false);
              return;
            }

            // Remove the test cube
            scene.remove(cube);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            console.log('GLTF Model bounding box:', { center, size });
            console.log('GLTF Box size:', size);

            // Try alternative centering approach for nested structures (GLTF)
            const mesh = model.getObjectByProperty('type', 'Mesh');
            if (mesh) {
              console.log('Found GLTF mesh child, centering based on mesh geometry');
              const meshBox = new THREE.Box3().setFromObject(mesh);
              const meshCenter = meshBox.getCenter(new THREE.Vector3());
              mesh.position.sub(meshCenter); // recenters the actual mesh
            } else {
              model.position.sub(center); // Center the model normally
            }

            // Apply uniform scaling to fit model into scene
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDim;
            model.scale.setScalar(scale);
            
            // Set default starting rotation (270 degrees around X-axis) - GLTF
            // Users can rotate freely from this position, it won't snap back until refresh
            model.rotation.x = (3 * Math.PI) / 2; // 270 degrees in radians

            // Recalculate bounding box after scaling and centering
            const newBox = new THREE.Box3().setFromObject(model);
            const newSize = newBox.getSize(new THREE.Vector3());
            const newCenter = newBox.getCenter(new THREE.Vector3());

            // Move model so bottom sits at y=0
            const bottomY = newBox.min.y;
            model.position.y -= bottomY; // Adjust upward

            // Camera distance to fit model based on size
            const fitHeightDistance = newSize.y / (2 * Math.atan((Math.PI * camera.fov) / 360));
            const fitWidthDistance = newSize.x / (2 * Math.atan((Math.PI * camera.fov) / 360));
            const distance = Math.max(fitHeightDistance, fitWidthDistance);

            camera.position.set(0, newSize.y * 0.5, distance * 1.2);
            camera.lookAt(0, newSize.y * 0.5, 0);

            controls.target.set(0, newSize.y * 0.5, 0);
            controls.update();

            console.log('GLTF Model scale:', scale);
            console.log('GLTF Camera distance:', distance);

            // Handle materials based on preference
            console.log('Processing materials...');
            let gltfMaterialCount = 0;
            
            // Define radically different colors for each mesh part (GLTF)
            const gltfMeshColors = [
              0xff0000, // Red
              0x00ff00, // Green
              0x0000ff, // Blue
              0x000080, // Dark Blue (was Yellow)
              0x006d8f, // Company Blue (was Magenta)
              0xffffff, // White (was Cyan)
              0xff8000, // Orange
              0x000000  // Black (was Purple)
            ];
            
            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                gltfMaterialCount++;
                console.log(`GLTF Mesh ${gltfMaterialCount} - Original material:`, child.material);
                console.log(`GLTF Material type:`, child.material?.type);
                console.log(`GLTF Material color:`, child.material?.color);
                console.log(`GLTF Material color hex:`, child.material?.color?.getHexString());
                console.log(`GLTF Material map:`, child.material?.map);
                console.log(`GLTF Material metallic:`, child.material?.metallic);
                console.log(`GLTF Material roughness:`, child.material?.roughness);
                
                if (useOriginalMaterials) {
                  // Keep original materials completely unchanged
                  console.log('Using original materials');
                } else {
                  // Apply different colors to each mesh part (GLTF)
                  const colorIndex = (gltfMaterialCount - 1) % gltfMeshColors.length;
                  const meshColor = gltfMeshColors[colorIndex];
                  
                  console.log(`GLTF Applying color ${colorIndex + 1} to mesh ${gltfMaterialCount}: #${meshColor.toString(16)}`);
                  
                  // Create new material with different color for each mesh
                  child.material = new THREE.MeshStandardMaterial({
                    color: meshColor,
                    metalness: 0.8, // More metallic for better reflections
                    roughness: 0.1, // Very smooth and reflective
                    side: THREE.DoubleSide,
                    wireframe: false // Solid material
                  });
                  
                  // Add wireframe edges for better definition
                  const edges = new THREE.EdgesGeometry(child.geometry);
                  const wireframe = new THREE.LineSegments(
                    edges,
                    new THREE.LineBasicMaterial({ 
                      color: 0x000000, // Black wireframe lines
                      linewidth: 1
                    })
                  );
                  child.add(wireframe);
                }
                
                // Shadows disabled for cleaner view
                child.castShadow = false;
                child.receiveShadow = false;
              }
            });

            scene.add(model);
            setLoading(false);
          },
          (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(percent);
            console.log('GLTF Loading progress:', percent + '%');
          },
          (gltfError) => {
            console.error('❌ Error loading GLTF model:', gltfError);
            setError(`Failed to load both GLB and GLTF models: ${error.message || 'Unknown error'}`);
            setLoading(false);
          }
        );
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      
      {/* 3D Viewer */}
      <div
        ref={containerRef}
        className="w-full h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
        style={{ minHeight: '400px' }}
      >
        {loading && (
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>Loading 3D Model...</p>
            <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}%</p>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center">
            <p className="text-lg font-semibold mb-2">⚠️ {error}</p>
            <p className="text-sm">Check the browser console for more details.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};