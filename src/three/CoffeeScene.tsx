import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, ContactShadows, Html } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { scrollState } from "../lib/scrollState";

const MODEL_URL = "/models/necta.glb";

// Y-rotation (radians) that turns the bag's front (logo) toward the camera
// when it settles centre-stage. Tune if a different face shows.
const FRONT_Y = 0;

function Model() {
  // GLB is Draco-compressed; decoder is hosted locally in /public/draco.
  const { scene } = useGLTF(MODEL_URL, "/draco/");
  const outer = useRef<Group>(null);
  const spin = useRef(0);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!outer.current) return;
    const p = scrollState.hero; // 0 → 1

    // Starts on the RIGHT, slightly up (in the About section) and travels
    // DOWN to dead-centre as you scroll into "Why Choose Us".
    const isMobile = viewport.width < 6;
    const startX = isMobile ? 0 : viewport.width * 0.22;
    const startY = isMobile ? 0 : 0.35;
    const targetX = MathUtils.lerp(startX, 0, p);
    const targetY = MathUtils.lerp(startY, -0.15, p);
    const baseScale = isMobile ? 1.15 : 1.2;
    const targetScale = MathUtils.lerp(baseScale, baseScale * 1.55, p);

    // smooth follow — NO vertical bob; the bag settles in a fixed spot.
    const k = 1 - Math.pow(0.001, delta);
    outer.current.position.x = MathUtils.lerp(outer.current.position.x, targetX, k);
    outer.current.position.y = MathUtils.lerp(outer.current.position.y, targetY, k);
    outer.current.scale.setScalar(
      MathUtils.lerp(outer.current.scale.x || baseScale, targetScale, k)
    );

    // Spin freely while gliding in, then settle to a steady front-facing pose
    // (tiny rotation sway only) — so the bag never shows its back label.
    spin.current += delta * 0.3;
    const settle = FRONT_Y + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    const blend = MathUtils.smoothstep(p, 0.4, 0.9);
    outer.current.rotation.y = MathUtils.lerp(spin.current, settle, blend);
  });

  return (
    <group ref={outer}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-espresso/70">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-caramel border-t-transparent" />
        <span className="font-hand text-xl">brewing…</span>
      </div>
    </Html>
  );
}

export default function CoffeeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#cda06a" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#b07a3c" />

      <Suspense fallback={<Loader />}>
        <Model />
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          scale={10}
          blur={2.6}
          far={4}
          color="#241308"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL, "/draco/");
