import { UfoBeam } from './UfoBeam';
import ufoVideo from '/assets/versteigerung/ufo_video.mp4';

export function UfoBeamPageComponent() {
  return (
    <div className="space-y-16">
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
          UFO Beam Spectacle
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-200">
          Unser interaktiver Strahl entführt Produkte auf eine kosmische Bühne. Dieses Unikat war das Highlight einer Auktion
          und wurde dort erfolgreich verkauft – jetzt dient es als strahlendes Beispiel für unsere kreative Technik.
        </p>
        <video
          className="mx-auto w-full max-w-3xl rounded-lg shadow-2xl"
          controls
          src={ufoVideo}
        />
      </section>
      <UfoBeam />
    </div>
  );
}
