import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './projects.module.css';

const projects = [
  {
    id: 'edulab-synthesis-engine',
    title: 'eduLAB Synthesis Engine',
    description: 'A high-performance audio synthesis engine running on Teensy 4.1, featuring real-time DSP, I2S audio output, and mixed-signal design.',
    image: '/img/projects/synthesis-engine-placeholder.png',
    techTags: ['Teensy 4.1', 'I2S Audio', 'DSP', 'Mixed-Signal', 'C++'],
    status: 'in-progress',
    link: '/blog/tags/edulab-synthesis-engine',
  },
  {
    id: 'future-project-1',
    title: 'Future Project',
    description: 'More projects coming soon as I continue building and learning.',
    image: '/img/projects/placeholder.png',
    techTags: ['Coming Soon'],
    status: 'documentation',
    link: '#',
  },
];

function ProjectCard({project}) {
  const statusClass = {
    'completed': 'completed',
    'in-progress': 'in-progress',
    'documentation': 'documentation',
  }[project.status] || 'documentation';

  const statusText = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'documentation': 'Documentation Phase',
  }[project.status] || 'Documentation Phase';

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImage}>
        <div className={styles.placeholderImage}>
          <span>{project.title}</span>
        </div>
      </div>
      <div className={styles.projectContent}>
        <Heading as="h3">{project.title}</Heading>
        <p>{project.description}</p>
        <div className={styles.techTags}>
          {project.techTags.map((tag, idx) => (
            <span key={idx} className="tech-tag">{tag}</span>
          ))}
        </div>
        <div className={styles.projectFooter}>
          <span className={`status-badge ${statusClass}`}>{statusText}</span>
          {project.link !== '#' && (
            <Link
              className="button button--outline button--primary button--sm"
              to={project.link}>
              Learn More →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Layout
      title="Projects"
      description="Hardware and embedded systems projects - from breadboard prototypes to professional designs">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <Heading as="h1" className={styles.pageTitle}>Projects</Heading>
            <p className={styles.pageDescription}>
              A collection of embedded systems and hardware projects documenting my journey 
              from self-taught maker to professional hardware designer.
            </p>
          </div>
        </div>
        <div className="row">
          {projects.map((project) => (
            <div key={project.id} className="col col--12 col--6 col--4 margin-bottom--lg">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
