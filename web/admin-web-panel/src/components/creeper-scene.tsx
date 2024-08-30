import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1} />;
}

export default function Scene() {
    return (
        <Canvas
            style={{ height: '30vh', backgroundColor: 'inherit'}}
            camera={{ position: [2, 2, 40], fov: 50 }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} />
            <Model url="/minecraft_creeper.glb" />
        </Canvas>
    );
}
