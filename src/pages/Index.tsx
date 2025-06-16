
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import IndividualOrbital from '@/components/IndividualOrbital';

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const orbitalData = [
    {
      type: 'px' as const,
      title: 'px Orbital',
      description: 'Electron motion along x-axis in dumbbell pattern',
      symmetry: 'Dumbbell shape along x-axis',
      nodes: 'Nodal plane at x = 0 (yz plane)'
    },
    {
      type: 'py' as const,
      title: 'py Orbital',
      description: 'Electron motion along y-axis in dumbbell pattern',
      symmetry: 'Dumbbell shape along y-axis',
      nodes: 'Nodal plane at y = 0 (xz plane)'
    },
    {
      type: 'pz' as const,
      title: 'pz Orbital',
      description: 'Electron motion along z-axis in dumbbell pattern',
      symmetry: 'Dumbbell shape along z-axis',
      nodes: 'Nodal plane at z = 0 (xy plane)'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              P Orbital Electron Animations
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Watch electrons follow their quantum mechanical paths in px, py, and pz atomic orbitals with real-time 3D animations
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3 text-lg"
            >
              {isAnimating ? 'Pause' : 'Play'} All Animations
            </Button>
            <Button
              onClick={() => setShowInfo(!showInfo)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3 text-lg"
            >
              {showInfo ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </div>
      </div>

      {/* Three Orbital Diagrams */}
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {orbitalData.map((orbital) => (
              <IndividualOrbital
                key={orbital.type}
                orbitalType={orbital.type}
                isAnimating={isAnimating}
                title={orbital.title}
                description={orbital.description}
              />
            ))}
          </div>

          {/* Information Panel */}
          {showInfo && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {orbitalData.map((orbital) => (
                <Card key={`info-${orbital.type}`} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {orbital.title} Details
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {orbital.type.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Symmetry</h4>
                      <p className="text-sm text-gray-300">
                        {orbital.symmetry}
                      </p>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Nodes</h4>
                      <p className="text-sm text-gray-300">
                        {orbital.nodes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Updated Legend */}
          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-center">Visualization Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span>Moving Electron</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-2 bg-purple-500 rounded"></div>
                  <span>Orbital Path</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span>Nucleus</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-4 bg-red-500"></div>
                    <div className="w-2 h-4 bg-green-500"></div>
                    <div className="w-2 h-4 bg-blue-500"></div>
                  </div>
                  <span>XYZ Axes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
