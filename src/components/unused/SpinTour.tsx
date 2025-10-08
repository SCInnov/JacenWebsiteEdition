import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Scroll, ScrollControls, useGLTF, useScroll, Bounds } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

/** Types **/
type Section = {
  id: string;
  /** World-space target the camera should look from (position) */
  camPos: [number, number, number];
  /** Optional: world-space point to look at, defaults to model center */
  lookAt?: [number, number, number];
  /** Label anchored to this world position on the model */
  labelPos: [number, number, number];
  title: string;
  body: string;
};

export type SpinTourProps = {
  modelPath: string;
  sections?: Section[]; // made optional and defaulted safely
  /** Optional initial camera position */
  initialCam?: [number, number, number];
  /** How snappy the camera moves (larger = snappier) */
  camDamp?: number;
  /** Background environment preset: "city", "studio", etc. */
  envPreset?: "city" | "studio" | "warehouse" | "sunset" | "dawn" | "night" | null;
  /** Canvas className for layout */
  className?: string;
};

/** Utility: damp a vector toward target */
function dampVec3(current: THREE.Vector3, target: THREE.Vector3, lambda: number, dt: number) {
  current.x = THREE.MathUtils.damp(current.x, target.x, lambda, dt);
  current.y = THREE.MathUtils.damp(current.y, target.y, lambda, dt);
  current.z = THREE.MathUtils.damp(current.z, target.z, lambda, dt);
}

/** Main 3D Model */
function Device({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} />;
}

/** Camera Controller driven by scroll */
function ScrollCamera({ sections = [], camDamp = 6 }: { sections?: Section[]; camDamp?: number }) {
  const { camera } = useThree();
  const scroll = useScroll();

  // Guard for empty sections to avoid runtime errors
  const first = React.useMemo(() => (sections && sections[0]) ? sections[0] : { camPos: [0, 1.5, 6] as [number, number, number], lookAt: [0, 0, 0] as [number, number, number] }, [sections]);

  const targetPos = React.useRef(new THREE.Vector3(...first.camPos));
  const lookAt = React.useRef(new THREE.Vector3(...(first.lookAt ?? [0, 0, 0])));

  useFrame((_, dt) => {
    if (!sections || !sections.length) return;

    // Determine which section we're closest to based on scroll offset (0..1)
    const t = scroll.offset; // 0 to 1
    const idx = Math.min(sections.length - 1, Math.max(0, Math.round(t * (sections.length - 1))));
    const sec = sections[idx];

    targetPos.current.set(...sec.camPos);
    lookAt.current.set(...(sec.lookAt ?? [0, 0, 0]));

    // Smoothly move the camera toward target
    dampVec3(camera.position, targetPos.current, camDamp, dt);
    camera.lookAt(lookAt.current);
  });

  return null;
}

/** Floating labels anchored to model points; click to open notecards */
function Labels({ sections = [], onOpen }: { sections?: Section[]; onOpen: (id: string) => void }) {
  return (
    <>
      {(sections ?? []).map((s) => (
        <Html
          key={s.id}
          position={s.labelPos}
          transform
          occlude={true}
          zIndexRange={[10, 0]}
          distanceFactor={6}
          className="select-none"
        >
          <button
            onClick={() => onOpen(s.id)}
            className="rounded-2xl px-3 py-2 bg-white/80 backdrop-blur text-gray-900 shadow hover:bg-white transition text-sm font-medium border border-black/5"
          >
            {s.title}
          </button>
        </Html>
      ))}
    </>
  );
}

/** Overlay UI: scroll helper + notecards */
function Overlay({ sections = [], active, setActive }: { sections?: Section[]; active: string | null; setActive: (id: string | null) => void }) {
  const activeSection = sections.find((s) => s.id === active) || null;
  return (
    <Scroll html>
      {/* Page-sized panels for scrolling (invisible, used to create pages) */}
      <div className="h-[400vh] w-full" />

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <div className="rounded-full bg-black/70 text-white px-4 py-2 text-xs shadow">Scroll to tour • Click labels for details</div>
      </div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-xl z-50"
          >
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-black/5 shadow-lg p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-2 h-6 rounded-full bg-gray-900 mt-1" />
                <div className="grow">
                  <div className="text-sm font-semibold text-gray-900">{activeSection.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{activeSection.body}</div>
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => setActive(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs hover:opacity-90"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Scroll>
  );
}

/** Wrapper scene that composes everything */
function Scene({ modelPath, sections = [], camDamp, envPreset }: { modelPath: string; sections?: Section[]; camDamp?: number; envPreset?: SpinTourProps["envPreset"] }) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <>
      {/* Frame the model nicely regardless of size */}
      <Bounds fit margin={1.2}>
        <React.Suspense fallback={null}>
          <Device modelPath={modelPath} />
        </React.Suspense>
      </Bounds>

      <Labels sections={sections} onOpen={setActive} />
      <ScrollCamera sections={sections} camDamp={camDamp} />

      <Overlay sections={sections} active={active} setActive={setActive} />

      {envPreset && <Environment preset={envPreset} />}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
    </>
  );
}

/** Public Component */
export default function SpinTour({
  modelPath,
  sections: _sections = [],
  initialCam = [0, 1.5, 6],
  camDamp = 6,
  envPreset = "studio",
  className = "w-full h-[120vh]",
}: SpinTourProps) {
  const sections = _sections ?? [];
  const pages = Math.max(2, sections.length || 1);

  // Preload GLTF to reduce pop-in
  React.useEffect(() => {
    // @ts-ignore - drei augments useGLTF with preload at runtime
    if (typeof (useGLTF as any).preload === "function") {
      (useGLTF as any).preload(modelPath);
    }
  }, [modelPath]);

  return (
    <div className={className}>
      <Canvas camera={{ position: initialCam, fov: 45, near: 0.1, far: 100 }} dpr={[1, 2]}>
        <color attach="background" args={["#f6f7fb"]} />
        <ScrollControls pages={pages} damping={0.25}>{/* Damping controls scroll smoothing */}
          <Scene modelPath={modelPath} sections={sections} camDamp={camDamp} envPreset={envPreset} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

