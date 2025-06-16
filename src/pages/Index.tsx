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
      title: 'px Orbitaal',
      description: 'Elektronbeweging langs x-as in halterpatroon',
      symmetry: 'Haltervorm langs x-as',
      nodes: 'Knoopvlak by x = 0 (yz vlak)'
    },
    {
      type: 'py' as const,
      title: 'py Orbitaal',
      description: 'Elektronbeweging langs y-as in halterpatroon',
      symmetry: 'Haltervorm langs y-as',
      nodes: 'Knoopvlak by y = 0 (xz vlak)'
    },
    {
      type: 'pz' as const,
      title: 'pz Orbitaal',
      description: 'Elektronbeweging langs z-as in halterpatroon',
      symmetry: 'Haltervorm langs z-as',
      nodes: 'Knoopvlak by z = 0 (xy vlak)'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              P Orbitaal Elektron Animasies
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Kyk hoe elektrone hul kwantum-meganiese paaie volg in px, py, en pz atoom-orbitale met intydse 3D animasies
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3 text-lg"
            >
              {isAnimating ? 'Staak alle animasies' : 'Speel'} 
            </Button>
            <Button
              onClick={() => setShowInfo(!showInfo)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3 text-lg"
            >
              {showInfo ? 'Versteek' : 'Wys'} Besonderhede
            </Button>
          </div>

          {/* Developer Credit */}
          <div className="text-center mb-8">
            <h4 className="text-lg text-blue-300 font-medium">
              Ontwikkelaar: T. Faul
            </h4>
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
                      {orbital.title} Besonderhede
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {orbital.type.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Simmetrie</h4>
                      <p className="text-sm text-gray-300">
                        {orbital.symmetry}
                      </p>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Knope</h4>
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
              <CardTitle className="text-lg text-center">Visualisering Legende</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span>Bewegende Elektron</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-2 bg-purple-500 rounded"></div>
                  <span>Orbitaal Pad</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span>Kern</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-4 bg-red-500"></div>
                    <div className="w-2 h-4 bg-green-500"></div>
                    <div className="w-2 h-4 bg-blue-500"></div>
                  </div>
                  <span>XYZ Asse</span>
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