"use client";

import { Suspense, useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Stars, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Globe3DMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: string;
  color: string;
  description?: string;
}

interface Globe3DArc {
  from: [number, number]; // [lat, lng]
  to: [number, number];
  color: string;
}

interface Globe3DProps {
  markers: Globe3DMarker[];
  arcs?: Globe3DArc[];
  title?: string;
  height?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

/* ------------------------------------------------------------------ */
/*  Grid Lines                                                         */
/* ------------------------------------------------------------------ */

function GlobeGrid({ radius }: { radius: number }) {
  const lines = useMemo(() => {
    const result: { points: [number, number, number][]; key: string }[] = [];
    const segments = 64;

    // Latitude lines every 30 degrees
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: [number, number, number][] = [];
      for (let i = 0; i <= segments; i++) {
        const lng = (i / segments) * 360 - 180;
        points.push(latLngToVec3(lat, lng, radius));
      }
      result.push({ points, key: `lat-${lat}` });
    }

    // Longitude lines every 30 degrees
    for (let lng = -180; lng < 180; lng += 30) {
      const points: [number, number, number][] = [];
      for (let i = 0; i <= segments; i++) {
        const lat = (i / segments) * 180 - 90;
        points.push(latLngToVec3(lat, lng, radius));
      }
      result.push({ points, key: `lng-${lng}` });
    }

    return result;
  }, [radius]);

  return (
    <>
      {lines.map((line) => (
        <Line
          key={line.key}
          points={line.points}
          color="#06b6d4"
          lineWidth={0.6}
          opacity={0.35}
          transparent
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Atmosphere Glow                                                    */
/* ------------------------------------------------------------------ */

function AtmosphereGlow() {
  return (
    <>
      {/* Inner glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Particles                                                 */
/* ------------------------------------------------------------------ */

function FloatingParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.004}
        color="#06b6d4"
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Glowing Marker                                                     */
/* ------------------------------------------------------------------ */

interface MarkerSphereProps {
  marker: Globe3DMarker;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

function MarkerSphere({
  marker,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: MarkerSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const position = useMemo(
    () => latLngToVec3(marker.lat, marker.lng, 1.005),
    [marker.lat, marker.lng],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Marker pulse
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const baseIntensity = isSelected ? 3.5 : isHovered ? 2.5 : 1.2;
      mat.emissiveIntensity =
        baseIntensity + Math.sin(t * 2 + phaseOffset) * 0.4;
    }

    // Expanding ring
    if (pulseRef.current) {
      const cycle = ((t + phaseOffset) % 1.5) / 1.5;
      const scale = 1 + cycle * 3;
      pulseRef.current.scale.set(scale, scale, scale);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - cycle) * 0.35;
    }
  });

  const handlePointerOver = useCallback(
    (e: THREE.Event) => {
      (e as unknown as { stopPropagation: () => void }).stopPropagation();
      onHoverStart(marker.id);
      document.body.style.cursor = "pointer";
    },
    [marker.id, onHoverStart],
  );

  const handlePointerOut = useCallback(() => {
    onHoverEnd();
    document.body.style.cursor = "auto";
  }, [onHoverEnd]);

  const handleClick = useCallback(
    (e: THREE.Event) => {
      (e as unknown as { stopPropagation: () => void }).stopPropagation();
      onSelect(marker.id);
    },
    [marker.id, onSelect],
  );

  return (
    <group position={position}>
      {/* Marker sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial
          color={marker.color}
          emissive={marker.color}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial
          color={marker.color}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Tooltip on hover */}
      {isHovered && (
        <Html
          distanceFactor={3}
          style={{ pointerEvents: "none" }}
          center
          position={[0, 0.06, 0]}
        >
          <div
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5",
              "border border-white/10 bg-gray-900/80 backdrop-blur-md",
              "text-xs font-medium text-white shadow-lg",
            )}
          >
            {marker.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Connection Arc                                                     */
/* ------------------------------------------------------------------ */

function ConnectionArc({ arc }: { arc: Globe3DArc }) {
  const points = useMemo(() => {
    const start = new THREE.Vector3(...latLngToVec3(arc.from[0], arc.from[1], 1));
    const end = new THREE.Vector3(...latLngToVec3(arc.to[0], arc.to[1], 1));

    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(1 + dist * 0.4);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(48).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, [arc]);

  return (
    <Line
      points={points}
      color={arc.color}
      lineWidth={1.2}
      transparent
      opacity={0.55}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Globe Scene (inner)                                                */
/* ------------------------------------------------------------------ */

interface GlobeSceneProps {
  markers: Globe3DMarker[];
  arcs: Globe3DArc[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

function GlobeScene({
  markers,
  arcs,
  selectedId,
  hoveredId,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: GlobeSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} />
      <pointLight position={[-5, -3, -5]} intensity={0.2} color="#06b6d4" />

      {/* Stars */}
      <Stars
        radius={80}
        depth={60}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Globe base */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grid */}
      <GlobeGrid radius={1.002} />

      {/* Atmosphere */}
      <AtmosphereGlow />

      {/* Floating particles */}
      <FloatingParticles count={300} />

      {/* Markers */}
      {markers.map((marker) => (
        <MarkerSphere
          key={marker.id}
          marker={marker}
          isSelected={selectedId === marker.id}
          isHovered={hoveredId === marker.id}
          onSelect={onSelect}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}

      {/* Arcs */}
      {arcs.map((arc, i) => (
        <ConnectionArc key={`arc-${i}`} arc={arc} />
      ))}

      {/* Controls */}
      <OrbitControls
        autoRotate={!selectedId}
        autoRotateSpeed={0.4}
        enablePan={false}
        minDistance={1.6}
        maxDistance={3.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Globe3D (main export)                                              */
/* ------------------------------------------------------------------ */

function Globe3D({
  markers,
  arcs = [],
  title,
  height = 550,
}: Globe3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedMarker = useMemo(
    () => markers.find((m) => m.id === selectedId) ?? null,
    [markers, selectedId],
  );

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId((prev) => (prev === id ? null : id));
    },
    [],
  );

  const handleHoverStart = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "my-8 rounded-2xl border border-surface-200 bg-surface-0 p-5",
        "shadow-sm overflow-hidden",
      )}
    >
      {title && (
        <h3 className="mb-4 font-heading text-lg font-bold text-text-primary">
          {title}
        </h3>
      )}

      {/* Canvas container */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ height }}
      >
        {/* Dark radial gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #0d1b2a 0%, #030712 100%)",
          }}
        />

        {isInView && (
          <Canvas
            camera={{ position: [0, 0, 2.8], fov: 42 }}
            dpr={[1, 2]}
            style={{ position: "relative" }}
          >
            <Suspense fallback={null}>
              <GlobeScene
                markers={markers}
                arcs={arcs}
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={handleSelect}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </Suspense>
          </Canvas>
        )}

        {/* Drag hint */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-3",
            "text-center text-xs text-white/40",
          )}
        >
          גרור לסיבוב · לחץ על נקודה למידע
        </div>
      </div>

      {/* Info Panel */}
      <AnimatePresence mode="wait">
        {selectedMarker && (
          <motion.div
            key={selectedMarker.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-4 rounded-xl border border-surface-200 p-4",
                "bg-surface-0",
              )}
              dir="rtl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-heading text-base font-bold text-text-primary">
                    {selectedMarker.name}
                  </h4>
                  <p className="mt-1 text-sm text-text-secondary">
                    {selectedMarker.population}
                  </p>
                  {selectedMarker.description && (
                    <p className="mt-2 text-sm text-text-muted">
                      {selectedMarker.description}
                    </p>
                  )}
                </div>
                <div
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: selectedMarker.color,
                    boxShadow: `0 0 8px ${selectedMarker.color}80`,
                  }}
                />
              </div>
              <div className="mt-3 flex gap-4 text-xs text-text-muted">
                <span>
                  {selectedMarker.lat.toFixed(2)}°{" "}
                  {selectedMarker.lat >= 0 ? "N" : "S"}
                </span>
                <span>
                  {selectedMarker.lng.toFixed(2)}°{" "}
                  {selectedMarker.lng >= 0 ? "E" : "W"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { Globe3D, type Globe3DProps, type Globe3DMarker, type Globe3DArc };
