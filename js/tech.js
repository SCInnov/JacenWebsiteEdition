// Technology page: scrubs the Blender scene's animation (exported to glTF) with page scroll,
// rendered through the scene's own animated camera.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const MODEL_URL = 'public/tech/sci_tech_scene.glb';
const BLENDER_ASPECT = 16 / 9; // render aspect the camera was framed for in Blender
const FPS = 24; // Blender scene frame rate; frame 1 = time 0

// The five captions are parented to the camera in Blender and faded with a shader Mix factor,
// which glTF cannot carry. These keyframes are copied from the .blend file:
// [frame, value] pairs for opacity and for the caption's local Y (it slides up as it fades out).
const CAPTIONS = {
    SCI_Text_1: { opacity: [[1, 0], [17, 1], [87, 1], [99, 0]], y: [[1, 0.006], [17, 0.012], [87, 0.012], [99, 0.018]] },
    SCI_Text_2: { opacity: [[103, 0], [119, 1], [217, 1], [229, 0]], y: [[103, 0.006], [119, 0.012], [217, 0.012], [229, 0.018]] },
    SCI_Text_3: { opacity: [[257, 0], [273, 1], [337, 1], [349, 0]], y: [[257, 0.006], [273, 0.012], [337, 0.012], [349, 0.018]] },
    SCI_Text_4: { opacity: [[401, 0], [417, 1], [655, 1], [667, 0]], y: [[401, 0.006], [417, 0.012], [505, 0.012], [535, 0.068], [655, 0.068], [667, 0.074]] },
    SCI_Text_5: { opacity: [[721, 0], [737, 1]], y: [[721, 0.006], [737, 0.012]] },
};
const SMOOTHING = new URLSearchParams(location.search).has('nosmooth') ? 1 : 0.15; // ?nosmooth = exact scrub (testing)
const CAPTION_X = 0.022;
const CAPTION_Z = -0.5;

function keyed(keys, f) {
    if (f <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
        const [f1, v1] = keys[i];
        if (f <= f1) {
            const [f0, v0] = keys[i - 1];
            let t = (f - f0) / (f1 - f0);
            t = t * t * (3 - 2 * t); // ease like Blender's default Bezier keys
            return v0 + (v1 - v0) * t;
        }
    }
    return keys[keys.length - 1][1];
}

const canvas = document.getElementById('tech-canvas');
const stage = document.getElementById('tech-stage');
const track = document.getElementById('tech-track');
const loading = document.getElementById('tech-loading');
const loadingLabel = document.getElementById('tech-loading-label');
const loadFill = document.getElementById('tech-loadfill');
const progressFill = document.getElementById('tech-progress-fill');

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (err) {
    loadingLabel.textContent = 'Your browser could not start 3D graphics, so the animation is unavailable.';
    throw err;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 0.95;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#eef0f3'); // Blender world color
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.45;
const key = new THREE.DirectionalLight(0xffffff, 2.4);
key.position.set(-5, 7, 8);
scene.add(key);
const rim = new THREE.DirectionalLight(0xdfe8ff, 1.6);
rim.position.set(4, 5, -7);
scene.add(rim);
const fill = new THREE.DirectionalLight(0xffffff, 0.5);
fill.position.set(6, 2, 6);
scene.add(fill);

let camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.05, 100);
let tanHalfH = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * BLENDER_ASPECT;
let mixer = null;
let actions = [];
const captions = [];
let duration = 0;
let shown = -1;
let current = 0;

function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    // Keep Blender's horizontal framing on narrow screens (phones) instead of cropping the sides.
    const tanHalfV = aspect < BLENDER_ASPECT ? tanHalfH / aspect : tanHalfH / BLENDER_ASPECT;
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(tanHalfV));
    camera.updateProjectionMatrix();
    shown = -1;
}

function scrollProgress() {
    const total = track.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const p = -track.getBoundingClientRect().top / total;
    return Math.min(1, Math.max(0, p));
}

function frame() {
    requestAnimationFrame(frame);
    if (!mixer) return;
    const p = scrollProgress();
    const target = p * (duration - 1e-3);
    current += (target - current) * SMOOTHING;
    if (Math.abs(target - current) < 1e-4) current = target;
    if (current === shown) return;
    for (const a of actions) a.time = current;
    mixer.update(0);
    const f = 1 + current * FPS;
    for (const c of captions) {
        const o = keyed(c.keys.opacity, f);
        c.node.position.set(CAPTION_X, keyed(c.keys.y, f), CAPTION_Z);
        c.node.visible = o > 0.002;
        for (const m of c.materials) m.opacity = o;
    }
    progressFill.style.width = (p * 100).toFixed(2) + '%';
    renderer.render(scene, camera);
    shown = current;
}

new GLTFLoader().load(
    MODEL_URL,
    (gltf) => {
        scene.add(gltf.scene);
        if (gltf.cameras.length) {
            camera = gltf.cameras[0];
            tanHalfH = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * BLENDER_ASPECT;
        }
        for (const [name, keys] of Object.entries(CAPTIONS)) {
            const node = gltf.scene.getObjectByName(name);
            if (!node) continue;
            const materials = [];
            node.traverse((obj) => {
                if (!obj.isMesh) return;
                const list = Array.isArray(obj.material) ? obj.material : [obj.material];
                for (const m of list) {
                    m.transparent = true;
                    m.depthWrite = false;
                    m.opacity = 0;
                    materials.push(m);
                }
                obj.renderOrder = 10;
            });
            captions.push({ node, keys, materials });
        }
        mixer = new THREE.AnimationMixer(gltf.scene);
        // Caption tracks are replaced by CAPTIONS above (the exporter mis-converts camera-child motion).
        const clips = gltf.animations.filter((clip) => !clip.name.startsWith('SCI_Text_'));
        actions = clips.map((clip) => {
            duration = Math.max(duration, clip.duration);
            const action = mixer.clipAction(clip);
            action.play();
            return action;
        });
        resize();
        loading.classList.add('is-done');
    },
    (xhr) => {
        if (xhr.total) loadFill.style.width = ((xhr.loaded / xhr.total) * 100).toFixed(1) + '%';
    },
    (err) => {
        loadingLabel.textContent = 'The 3D model could not be loaded. Please refresh to try again.';
        console.error(err);
    }
);

window.addEventListener('resize', resize);
resize();
frame();
