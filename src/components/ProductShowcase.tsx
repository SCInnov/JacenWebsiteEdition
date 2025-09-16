import { motion } from 'framer-motion';
import { ModelViewer } from './ModelViewer';

export const ProductShowcase = () => {
  return (
    <section id="product" className="relative py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Title and Description Overlay */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="bg-gradient-primary bg-clip-text text-transparent">Second-Arm</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary assistive device that adapts to you, enhances your strength,
            and provides safe, stable support for daily activities.
          </p>
        </motion.div>

        {/* 3D Model Viewer */}
        <div className="relative">
          <ModelViewer />
        </div>
      </div>
    </section>
  );
};