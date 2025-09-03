import { useParams } from 'react-router-dom';
import { projects } from '@/data/projects';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export function ProjectPageComponent() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">Projekt nicht gefunden</div>
    );
  }

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.article
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 to-fuchsia-950/40 p-10 text-gray-100 shadow-xl backdrop-blur"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent)]" />
          <h1 className="relative mb-6 text-4xl font-extrabold text-white drop-shadow-lg">
            {project.title}
          </h1>
          <p className="relative mb-8 text-sm text-gray-300">{project.date}</p>
          <div className="relative space-y-4 leading-relaxed">
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
