"use client";

import { Canvas } from "@react-three/fiber";
import { 
  Stars, 
  OrbitControls, 
  PerspectiveCamera,
  Environment,
  Float,
  Center,
  Sparkles
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Componente de planeta
function Planet({ position, size, color, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

// Componente de asteroides
function Asteroids() {
  const asteroids = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 100
      ],
      size: Math.random() * 0.5 + 0.1,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 0.02 + 0.005
    }));
  }, []);

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <AsteroidMesh key={i} {...asteroid} />
      ))}
    </>
  );
}

function AsteroidMesh({ position, size, rotation, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.7;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <dodecahedronGeometry args={[size]} />
      <meshStandardMaterial 
        color="#666666"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

// Componente de nebulosa simplificada
function Nebula() {
  return (
    <>
      {/* Nebulosas usando esferas com material transparente */}
      <mesh position={[-15, 5, -10]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshStandardMaterial 
          color="#ff6b9d"
          transparent
          opacity={0.2}
          emissive="#ff6b9d"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh position={[20, -3, -15]}>
        <sphereGeometry args={[6, 16, 16]} />
        <meshStandardMaterial 
          color="#4ecdc4"
          transparent
          opacity={0.15}
          emissive="#4ecdc4"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh position={[0, 10, -20]}>
        <sphereGeometry args={[10, 16, 16]} />
        <meshStandardMaterial 
          color="#45b7d1"
          transparent
          opacity={0.18}
          emissive="#45b7d1"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
}

// Componente principal da cena
function SpaceContent() {
  return (
    <>
      {/* Câmera com controles */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        maxDistance={50}
        minDistance={5}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Iluminação */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <directionalLight position={[0, 0, 5]} intensity={0.8} />

      {/* Estrelas de fundo */}
      <Stars 
        radius={300} 
        depth={60} 
        count={8000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={0.5}
      />

      {/* Partículas brilhantes */}
      <Sparkles 
        count={200}
        scale={[30, 30, 30]}
        size={3}
        speed={0.3}
        opacity={0.6}
        color="#ffffff"
      />

      {/* Planetas */}
      <Planet position={[8, 2, -5]} size={1.5} color="#ff6b9d" speed={0.01} />
      <Planet position={[-6, -3, -8]} size={1} color="#4ecdc4" speed={0.015} />
      <Planet position={[12, -5, -12]} size={0.8} color="#45b7d1" speed={0.008} />
      <Planet position={[-10, 4, -15]} size={1.2} color="#96ceb4" speed={0.012} />

      {/* Asteroides */}
      <Asteroids />

      {/* Nebulosas */}
      <Nebula />

      {/* Elemento central brilhante */}
      <Center>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          {/* Esfera central principal */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#4ecdc4"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Anel ao redor */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.1, 8, 32]} />
            <meshStandardMaterial 
              color="#ff6b9d"
              emissive="#ff6b9d"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      </Center>

      {/* Ambiente HDR */}
      <Environment preset="night" />
    </>
  );
}

// Loading fallback
function SpaceLoader() {
  return (
    <div className="flex items-center justify-center h-full bg-black">
      <div className="text-white font-mono text-lg animate-pulse">
        Loading Universe...
      </div>
    </div>
  );
}

// Componente principal exportado
export function SpaceScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SpaceContent />
        </Suspense>
      </Canvas>
    </div>
  );
}