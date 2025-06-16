
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, BufferGeometry, Float32BufferAttribute } from 'three';
import * as THREE from 'three';

interface OrbitalVisualizationProps {
  orbitalType: 'px' | 'py' | 'pz';
  isAnimating: boolean;
}

const OrbitalVisualization = ({ orbitalType, isAnimating }: OrbitalVisualizationProps) => {
  const groupRef = useRef<Group>(null);
  const electronRef = useRef<THREE.Mesh>(null);
  const pathRef = useRef<THREE.Line>(null);
  const coordinateSystemRef = useRef<Group>(null);

  // Generate orbital path points
  const pathGeometry = useMemo(() => {
    const points: Vector3[] = [];
    const numPoints = 200;
    const axis = orbitalType.slice(1) as 'x' | 'y' | 'z';
    
    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4; // Two complete figure-8 loops
      const amplitude = 2.2;
      
      let x = 0, y = 0, z = 0;
      
      switch (axis) {
        case 'x':
          x = amplitude * Math.sin(t);
          y = Math.sin(t * 2) * 0.8;
          z = Math.cos(t * 2) * 0.8;
          break;
        case 'y':
          x = Math.sin(t * 2) * 0.8;
          y = amplitude * Math.sin(t);
          z = Math.cos(t * 2) * 0.8;
          break;
        case 'z':
          x = Math.sin(t * 2) * 0.8;
          y = Math.cos(t * 2) * 0.8;
          z = amplitude * Math.sin(t);
          break;
      }
      
      points.push(new Vector3(x, y, z));
    }
    
    const geometry = new BufferGeometry().setFromPoints(points);
    return geometry;
  }, [orbitalType]);

  // Electron position calculation
  const getElectronPosition = (time: number): Vector3 => {
    const axis = orbitalType.slice(1) as 'x' | 'y' | 'z';
    const speed = 1.5;
    const amplitude = 2.2;
    
    const t = time * speed;
    let x = 0, y = 0, z = 0;
    
    switch (axis) {
      case 'x':
        x = amplitude * Math.sin(t);
        y = Math.sin(t * 2) * 0.8;
        z = Math.cos(t * 2) * 0.8;
        break;
      case 'y':
        x = Math.sin(t * 2) * 0.8;
        y = amplitude * Math.sin(t);
        z = Math.cos(t * 2) * 0.8;
        break;
      case 'z':
        x = Math.sin(t * 2) * 0.8;
        y = Math.cos(t * 2) * 0.8;
        z = amplitude * Math.sin(t);
        break;
    }
    
    return new Vector3(x, y, z);
  };

  // Animation
  useFrame((state) => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += 0.003;
    }
    
    if (coordinateSystemRef.current && isAnimating) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      coordinateSystemRef.current.scale.setScalar(scale);
    }

    // Animate electron along orbital path
    if (electronRef.current && isAnimating) {
      const position = getElectronPosition(state.clock.elapsedTime);
      electronRef.current.position.copy(position);
      
      // Add glow effect
      const glowIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
      if (electronRef.current.material && 'emissiveIntensity' in electronRef.current.material) {
        (electronRef.current.material as THREE.MeshPhongMaterial).emissiveIntensity = glowIntensity;
      }
    }
  });

  // Materials
  const coordinateAxisMaterial = useMemo(() => ({
    x: new THREE.MeshBasicMaterial({ color: '#ef4444' }),
    y: new THREE.MeshBasicMaterial({ color: '#22c55e' }),
    z: new THREE.MeshBasicMaterial({ color: '#3b82f6' })
  }), []);

  const electronMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#fbbf24',
    emissive: '#f59e0b',
    emissiveIntensity: 0.6
  }), []);

  const pathMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: '#8b5cf6',
    opacity: 0.6,
    transparent: true,
    linewidth: 2
  }), []);

  return (
    <group>
      {/* Orbital Path */}
      <line ref={pathRef} geometry={pathGeometry} material={pathMaterial} />

      {/* Animated Electron */}
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.12]} />
        <primitive object={electronMaterial} attach="material" />
      </mesh>

      {/* Coordinate System */}
      <group ref={coordinateSystemRef}>
        {/* X-axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 6]} />
          <primitive object={coordinateAxisMaterial.x} attach="material" />
        </mesh>
        
        {/* Y-axis */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 6]} />
          <primitive object={coordinateAxisMaterial.y} attach="material" />
        </mesh>
        
        {/* Z-axis */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 6]} />
          <primitive object={coordinateAxisMaterial.z} attach="material" />
        </mesh>

        {/* Axis arrows */}
        <mesh position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.15, 0.4]} />
          <primitive object={coordinateAxisMaterial.x} attach="material" />
        </mesh>
        
        <mesh position={[0, 3, 0]}>
          <coneGeometry args={[0.15, 0.4]} />
          <primitive object={coordinateAxisMaterial.y} attach="material" />
        </mesh>
        
        <mesh position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.15, 0.4]} />
          <primitive object={coordinateAxisMaterial.z} attach="material" />
        </mesh>
      </group>

      {/* Nucleus representation */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshPhongMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

export default OrbitalVisualization;
