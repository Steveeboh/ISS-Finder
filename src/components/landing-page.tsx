import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Rocket, Video, Target } from 'lucide-react'
import { Link } from "react-router-dom"
import teamjpg from '/assets/team1.jpg'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function ParticleSystem() {
  const { scene } = useGLTF("/assets/particle_system.glb");
  return (
    <primitive 
      object={scene} 
      position={[0, 0, -2]}
      scale={2.5}
    />
  );
}

function Background() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1E4959]/30 via-[#0a001f]/60 to-[#DBD2A4]/20 z-0"
        style={{ mixBlendMode: 'color-dodge' }}
      />
      
      <Canvas
        className="absolute inset-0"
        camera={{ 
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2} 
            color="#DBD2A4"
          />
          <spotLight
            position={[-10, 10, -5]}
            intensity={1.5}
            color="#1E4959"
          />
          <ParticleSystem />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function LandingPageComponent() {
  return (
    <div className="relative min-h-screen bg-[#0a001f]">
      <div className="absolute inset-0 pointer-events-none">
        <Background />
      </div>
      <div className="relative z-10">
        <main className="container mx-auto px-4">
          <section className="py-20 text-center">
            <h1 className="bg-clip-text text-white">
              Rigged Motion
            </h1>
            <h1 className="bg-clip-text text-white">Studios</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
              Willkommen bei Rigged Motion Studios, deinem Partner für beeindruckende 3D-Animationen für Werbezwecke. Wir sind ein junges, dynamisches Team von Designern und Animatoren, das mit Leidenschaft und frischen Ideen daran arbeitet, Deine Visionen zum Leben zu erwecken. Mit neusten Technologien und einem Auge für Details gestalten wir visuelle Erlebnisse, die begeistern und in Erinnerung bleiben.
            </p>
              <div className="flex justify-center space-x-4">
                <Link to="/projekte/ufo-beam">
                  <Button>
                    UFO Beam Showcase <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Unser Angebot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "3D Animation",
                  description: "Voll animierte Werbevideos ohne die Einschränkungen der Realität.",
                  icon: Rocket,
                },
                {
                  title: "Virtual Tours",
                  description: "Virtuell begehbare Erlebnisse für deine Räumlichkeiten.",
                  icon: Video,
                },
                {
                  title: "VFX",
                  description: "Virtuell begehbare Erlebnisse für deine Räumlichkeiten.",
                  icon: Target,
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="border-none hover:bg-blue-700 transition-colors duration-300 backdrop-blur-sm bg-opacity-50"
                  style={{ backgroundColor: "rgba(30, 73, 89, 0.8)" }}
                >
                  <CardHeader className="flex justify-center items-center">
                    <service.icon
                      className="w-full h-24"
                      style={{ color: "#ffffff" }}
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-xl font-bold mb-2 text-[#DBD2A4]">
                      {service.title}
                    </CardTitle>
                    <p className="text-white">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Über Uns</h2>
            <div className="flex justify-center mb-8">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={teamjpg}
                  alt="Our Team"
                  className="w-full h-auto max-w-[60%] mx-auto"
                />
              </div>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto text-center">
              <p className="text-xl text-white">
                Wir sind ein Team von Multimedia-Studenten, die eine Leidenschaft für 3D-Animationen und VFX teilen. Jeder von uns bringt eigene kreative Ansätze und Fähigkeiten mit, die wir in gemeinsamen Projekten vereinen. Wir sind neugierig, experimentierfreudig und stets auf der Suche nach neuen Herausforderungen. Obwohl wir noch am Anfang unseres Weges stehen, sind wir motiviert und freuen uns darauf, unsere Begeisterung für Animation mit DIR zu teilen.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}