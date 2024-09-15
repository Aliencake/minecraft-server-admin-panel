import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function CreeperScene() {
  return (
    <Canvas
      style={{ height: "30vh", backgroundColor: "inherit" }}
      camera={{ position: [2, 15, 40], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} />
      <Model url="/minecraft_creeper.glb" />
    </Canvas>
  );
}
