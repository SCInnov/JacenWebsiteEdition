import * as THREE from 'three';

// Shared medical device color scheme - Black and white focused
export const medicalColors = {
  primary: new THREE.Color(0x000000), // Pure black
  secondary: new THREE.Color(0xffffff), // Pure white
  accent: new THREE.Color(0x333333), // Dark gray
  white: new THREE.Color(0xf8f9fa), // Off-white
  gray: new THREE.Color(0x666666) // Medium gray
};

// Shared function to apply medical device colors to a model
export const applyMedicalDeviceColors = (model: THREE.Object3D, modelName: string = 'Unknown') => {
  // Use a fixed array to ensure consistent color order
  const colorArray = [
    medicalColors.primary,    // Deep teal blue
    medicalColors.secondary,  // Sage green
    medicalColors.accent,     // Lighter teal
    medicalColors.white,      // Medical white
    medicalColors.gray        // Medical gray
  ];
  
  let meshIndex = 0;
  
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Use deterministic color assignment based on mesh index
      const colorIndex = meshIndex % colorArray.length;
      const selectedColor = colorArray[colorIndex];
      
      console.log(`[${modelName}] Mesh ${meshIndex}: Applying color ${colorIndex} (${selectedColor.getHexString()})`);
      
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.color = selectedColor;
            mat.metalness = 0.1;
            mat.roughness = 0.3;
            mat.envMapIntensity = 0.5;
          });
        } else {
          child.material.color = selectedColor;
          child.material.metalness = 0.1;
          child.material.roughness = 0.3;
          child.material.envMapIntensity = 0.5;
        }
      }
      
      meshIndex++;
    }
  });
  
  console.log(`[${modelName}] Total meshes processed: ${meshIndex}`);
};
