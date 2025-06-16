
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrbitalVisualization from './OrbitalVisualization';

interface IndividualOrbitalProps {
  orbitalType: 'px' | 'py' | 'pz';
  isAnimating: boolean;
  title: string;
  description: string;
}

const IndividualOrbital = ({ orbitalType, isAnimating, title, description }: IndividualOrbitalProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-blue-300">
          {title}
        </CardTitle>
        <p className="text-center text-sm text-gray-300">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10">
          <Canvas
            camera={{ position: [4, 4, 4], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
            
            <OrbitalVisualization 
              orbitalType={orbitalType} 
              isAnimating={isAnimating}
            />
            
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
            />
            
            {/* Coordinate System Labels */}
            <Html position={[2.5, 0, 0]}>
              <div className="text-red-400 font-bold text-sm">+X</div>
            </Html>
            <Html position={[0, 2.5, 0]}>
              <div className="text-green-400 font-bold text-sm">+Y</div>
            </Html>
            <Html position={[0, 0, 2.5]}>
              <div className="text-blue-400 font-bold text-sm">+Z</div>
            </Html>
          </Canvas>
        </div>
        
        {/* Electron Path Legend */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
            <span className="text-xs text-gray-300">Electron</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-300">Nucleus</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualOrbital;
