import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Robot() {
  const { scene } = useGLTF("/assets/roboter_website.glb");
  const robotRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (
      !robotRef.current ||
      !robotRef.current.position ||
      !robotRef.current.rotation
    ) {
      return;
    }

    // Now we can safely access and set the properties
    robotRef.current.position.y = Math.sin(time * 2) * 0.2;
    robotRef.current.rotation.z = Math.sin(time * 3) * 0.1;
    robotRef.current.rotation.x = Math.sin(time * 2) * 0.1;
    robotRef.current.rotation.y = Math.sin(time) * 0.3;
  });

  return (
    <primitive
      ref={robotRef}
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1.5}
    />
  );
}

export function ContactPageComponent() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-[#0a001f]">
            <div 
                className="absolute inset-0 bg-gradient-to-br from-[#1E4959]/30 via-[#0a001f]/60 to-[#DBD2A4]/20"
                style={{ mixBlendMode: 'color-dodge' }}
            />

            <main className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-4xl font-bold mb-4">
                        <span className="text-white text-6xl">Bewege</span>{" "}
                        <span className="text-[#DBD2A4]">etwas mit uns!</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Erzähle uns von deinem Projekt und lasse uns gemeinsam
                        deine Vision zum Leben erwecken
                    </p>
                </div>

                {/* Form and Contact Info Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Tally Form */}
                    <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
                        <iframe
                            data-tally-src="https://tally.so/embed/wM8PgA?alignLeft=1&hideTitle=1&dynamicHeight=1"
                            loading="lazy"
                            width="100%"
                            height="500"
                            title="Contact form"
                            className="rounded-lg"
                        ></iframe>
                    </div>

                    {/* Contact Information */}
                    <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-[#1E4959]/30">
                        <h2 className="text-3xl font-bold text-white mb-6">Rigged Motion Studios</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-[#1E4959] flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[#DBD2A4] font-medium mb-1">Adresse</p>
                                    <p className="text-white">Breitenrainpl. 29</p>
                                    <p className="text-white">3014 Bern</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-[#1E4959] flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[#DBD2A4] font-medium mb-1">Email</p>
                                    <p className="text-white">rigged.motion@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-[#1E4959] flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[#DBD2A4] font-medium mb-1">Telefon</p>
                                    <p className="text-white">076 378 66 83</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-width Robot Animation */}
                <div className="h-[400px] relative rounded-lg overflow-hidden backdrop-blur-sm w-full">
                    <Canvas
                        camera={{ 
                            position: [0, 1, 5],
                            fov: 50
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
                            <Robot />
                            <OrbitControls 
                                enableZoom={false} 
                                enablePan={false}
                                minPolarAngle={Math.PI / 3}
                                maxPolarAngle={Math.PI / 2}
                                autoRotate
                                autoRotateSpeed={1}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </main>
        </div>
    );
}
