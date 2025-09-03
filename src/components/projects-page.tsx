import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function ProjectsPageComponent() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          Projekte
        </h1>
        <div className="grid gap-12 md:grid-cols-3">
          {projects.map((project) => {
            const to = project.link ?? `/projekte/${project.slug}`;
            const snippet = project.content.split('\n')[0];
            return (
              <Link key={project.slug} to={to} className="group">
                <motion.div
                  className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-6 shadow-lg backdrop-blur-md"
                  whileHover={{ rotate: 1, scale: 1.03 }}
                >
                  {project.thumbnail && (
                    project.thumbnail.endsWith('.mp4') ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                        src={project.thumbnail}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                        src={project.thumbnail}
                        alt=""
                      />
                    )
                  )}
                  <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <h2 className="relative mb-4 text-2xl font-semibold text-white drop-shadow-md">
                    {project.title}
                  </h2>
                  <p className="relative max-w-xs text-sm text-gray-200">{snippet}</p>
                  <span className="absolute bottom-4 right-4 text-xs uppercase tracking-wide text-[#DBD2A4] opacity-0 transition-opacity group-hover:opacity-100">
                    anschauen →
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
