export function MyStartUpPageComponent() {
    return (
        <div className="relative min-h-screen bg-[#0a001f]">
            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#1E4959]/30 via-[#0a001f]/60 to-[#DBD2A4]/20"
                style={{ mixBlendMode: 'color-dodge' }}
            />

            <main className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                {/* Title */}
                <div className="mb-16">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-4">
                        <span className="text-white">MyStartUp</span>
                    </h1>
                </div>

                {/* Information Card */}
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-[#1E4959]/30 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Startup-Programm
                    </h2>

                    <div className="space-y-6 text-white">
                        <div>
                            <p className="text-[#DBD2A4] font-medium mb-1">Über unser Programm</p>
                            <p>
                                Bei Rigged Motion Studios unterstützen wir innovative Startups dabei, ihre Ideen zu verwirklichen. 
                                Unser Programm bietet Mentoring, Ressourcen und ein starkes Netzwerk für Gründer.
                            </p>
                        </div>

                        <div>
                            <p className="text-[#DBD2A4] font-medium mb-1">Services</p>
                            <p>• Accelerator Program (12 Wochen)</p>
                            <p>• Innovation Lab für Prototyping</p>
                            <p>• Networking mit Investoren und Mentoren</p>
                            <p>• Technische Unterstützung und Beratung</p>
                        </div>

                        <div>
                            <p className="text-[#DBD2A4] font-medium mb-1">Kontakt</p>
                            <a
                                href="mailto:rigged.motion@gmail.com"
                                className="text-white hover:underline"
                            >
                                rigged.motion@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Optional Decorative Section */}
            </main>
        </div>
    );
}