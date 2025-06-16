
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import OrbitalVisualization from '@/components/OrbitalVisualization';

const Index = () => {
  const [selectedOrbital, setSelectedOrbital] = useState<'px' | 'py' | 'pz'>('px');
  const [isAnimating, setIsAnimating] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const orbitalInfo = {
    px: {
      name: 'px Orbital',
      description: 'Oriented along the x-axis with two lobes extending in the +x and -x directions',
      equation: 'ψ(px) ∝ x·e^(-r/a₀)',
      symmetry: 'Dumbbell shape along x-axis',
      nodes: 'Nodal plane at x = 0 (yz plane)'
    },
    py: {
      name: 'py Orbital',
      description: 'Oriented along the y-axis with two lobes extending in the +y and -y directions',
      equation: 'ψ(py) ∝ y·e^(-r/a₀)',
      symmetry: 'Dumbbell shape along y-axis',
      nodes: 'Nodal plane at y = 0 (xz plane)'
    },
    pz: {
      name: 'pz Orbital',
      description: 'Oriented along the z-axis with two lobes extending in the +z and -z directions',
      equation: 'ψ(pz) ∝ z·e^(-r/a₀)',
      symmetry: 'Dumbbell shape along z-axis',
      nodes: 'Nodal plane at z = 0 (xy plane)'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              P Orbital Visualizer
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Interactive 3D representations of px, py, and pz atomic orbitals with accurate mathematical shapes and phase information
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {(['px', 'py', 'pz'] as const).map((orbital) => (
              <Button
                key={orbital}
                onClick={() => setSelectedOrbital(orbital)}
                variant={selectedOrbital === orbital ? "default" : "outline"}
                className={`${
                  selectedOrbital === orbital 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/30'
                } px-6 py-3 text-lg font-semibold transition-all duration-300`}
              >
                {orbital.toUpperCase()} Orbital
              </Button>
            ))}
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3"
            >
              {isAnimating ? 'Pause' : 'Play'} Animation
            </Button>
            <Button
              onClick={() => setShowInfo(!showInfo)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3"
            >
              {showInfo ? 'Hide' : 'Show'} Info
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
        {/* 3D Visualization */}
        <div className="flex-1 min-h-[600px] lg:min-h-[800px]">
          <div className="w-full h-full bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10">
            <Canvas
              camera={{ position: [5, 5, 5], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
              
              <OrbitalVisualization 
                orbitalType={selectedOrbital} 
                isAnimating={isAnimating}
              />
              
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={15}
              />
              
              {/* Coordinate System */}
              <Html position={[3, 0, 0]}>
                <div className="text-red-400 font-bold text-lg">+X</div>
              </Html>
              <Html position={[0, 3, 0]}>
                <div className="text-green-400 font-bold text-lg">+Y</div>
              </Html>
              <Html position={[0, 0, 3]}>
                <div className="text-blue-400 font-bold text-lg">+Z</div>
              </Html>
            </Canvas>
          </div>
        </div>

        {/* Information Panel */}
        {showInfo && (
          <div className="lg:w-80 space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {orbitalInfo[selectedOrbital].name}
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">
                    {orbitalInfo[selectedOrbital].description}
                  </p>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Wave Function</h4>
                  <code className="text-sm bg-black/30 p-2 rounded block text-green-300">
                    {orbitalInfo[selectedOrbital].equation}
                  </code>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Symmetry</h4>
                  <p className="text-sm text-gray-300">
                    {orbitalInfo[selectedOrbital].symmetry}
                  </p>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Nodes</h4>
                  <p className="text-sm text-gray-300">
                    {orbitalInfo[selectedOrbital].nodes}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Color Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Positive Phase (+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Negative Phase (-)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  <span className="text-sm">Nodal Plane</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• <strong>Left Click + Drag:</strong> Rotate view</p>
                <p>• <strong>Right Click + Drag:</strong> Pan view</p>
                <p>• <strong>Scroll:</strong> Zoom in/out</p>
                <p>• <strong>Buttons:</strong> Switch orbitals</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
