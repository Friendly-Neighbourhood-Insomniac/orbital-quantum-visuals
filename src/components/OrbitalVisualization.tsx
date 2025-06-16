
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, BufferGeometry, Material, Vector3 } from 'three';
import * as THREE from 'three';

interface OrbitalVisualizationProps {
  orbitalType: 'px' | 'py' | 'pz';
  isAnimating: boolean;
}

const OrbitalVisualization = ({ orbitalType, isAnimating }: OrbitalVisualizationProps) => {
  const meshRef = useRef<Mesh>(null);
  const coordinateSystemRef = useRef<THREE.Group>(null);

  // Create orbital geometry based on type
  const { positiveGeometry, negativeGeometry, nodalPlane } = useMemo(() => {
    const createPOrbitalGeometry = (axis: 'x' | 'y' | 'z') => {
      const segments = 32;
      const rings = 16;
      
      // Create two spheres for the lobes
      const positiveLobe = new THREE.SphereGeometry(1.2, segments, rings);
      const negativeLobe = new THREE.SphereGeometry(1.2, segments, rings);
      
      // Position the lobes based on the axis
      const offset = 1.5;
      switch (axis) {
        case 'x':
          positiveLobe.translate(offset, 0, 0);
          negativeLobe.translate(-offset, 0, 0);
          break;
        case 'y':
          positiveLobe.translate(0, offset, 0);
          negativeLobe.translate(0, -offset, 0);
          break;
        case 'z':
          positiveLobe.translate(0, 0, offset);
          negativeLobe.translate(0, 0, -offset);
          break;
      }
      
      // Create nodal plane
      const planeGeometry = new THREE.PlaneGeometry(4, 4, 1, 1);
      switch (axis) {
        case 'x':
          planeGeometry.rotateY(Math.PI / 2);
          break;
        case 'y':
          planeGeometry.rotateX(Math.PI / 2);
          break;
        case 'z':
          // Default orientation is correct for z
          break;
      }
      
      return {
        positiveGeometry: positiveLobe,
        negativeGeometry: negativeLobe,
        nodalPlane: planeGeometry
      };
    };
    
    return createPOrbitalGeometry(orbitalType.slice(1) as 'x' | 'y' | 'z');
  }, [orbitalType]);

  // Animation
  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += 0.005;
    }
    
    if (coordinateSystemRef.current && isAnimating) {
      // Subtle pulsing animation for the coordinate system
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coordinateSystemRef.current.scale.setScalar(scale);
    }
  });

  // Materials
  const positiveMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#ef4444',
    opacity: 0.7,
    transparent: true,
    shininess: 100
  }), []);

  const negativeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#3b82f6',
    opacity: 0.7,
    transparent: true,
    shininess: 100
  }), []);

  const nodalPlaneMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#6b7280',
    opacity: 0.2,
    transparent: true,
    side: THREE.DoubleSide
  }), []);

  const coordinateAxisMaterial = useMemo(() => ({
    x: new THREE.MeshBasicMaterial({ color: '#ef4444' }),
    y: new THREE.MeshBasicMaterial({ color: '#22c55e' }),
    z: new THREE.MeshBasicMaterial({ color: '#3b82f6' })
  }), []);

  return (
    <group>
      {/* Orbital Lobes */}
      <group ref={meshRef}>
        <mesh geometry={positiveGeometry} material={positiveMaterial} />
        <mesh geometry={negativeGeometry} material={negativeMaterial} />
        <mesh geometry={nodalPlane} material={nodalPlaneMaterial} />
      </group>

      {/* Coordinate System */}
      <group ref={coordinateSystemRef}>
        {/* X-axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 6]} />
          <primitive object={coordinateAxisMaterial.x} attach="material" />
        </mesh>
        
        {/* Y-axis */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 6]} />
          <primitive object={coordinateAxisMaterial.y} attach="material" />
        </mesh>
        
        {/* Z-axis */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 6]} />
          <primitive object={coordinateAxisMaterial.z} attach="material" />
        </mesh>

        {/* Axis arrows */}
        <mesh position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.3]} />
          <primitive object={coordinateAxisMaterial.x} attach="material" />
        </mesh>
        
        <mesh position={[0, 3, 0]}>
          <coneGeometry args={[0.1, 0.3]} />
          <primitive object={coordinateAxisMaterial.y} attach="material" />
        </mesh>
        
        <mesh position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.1, 0.3]} />
          <primitive object={coordinateAxisMaterial.z} attach="material" />
        </mesh>
      </group>

      {/* Nucleus representation */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshPhongMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

export default OrbitalVisualization;
