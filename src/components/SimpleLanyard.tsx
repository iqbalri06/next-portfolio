"use client";
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function SimpleLanyard({
  position = [0, 0, 30],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
      >
        <ambientLight intensity={Math.PI} />
        <PlaceholderCard />
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function PlaceholderCard() {
  const cardRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
    if (cardRef.current) {
      cardRef.current.rotation.x += delta * 0.2;
      cardRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Box ref={cardRef} args={[2, 3, 0.1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#3498db" />
    </Box>
  );
}
