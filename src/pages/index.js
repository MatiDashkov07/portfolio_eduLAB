import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Mati Dashkov
        </Heading>
        <p className="hero__subtitle">
          Aspiring Embedded Systems Engineer | Building in Public
        </p>
        <p className={styles.tagline}>
          Documenting the journey from breadboard to professional hardware design
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/projects/edulab-synthesis-engine/intro">
            View Projects
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{marginLeft: '1rem'}}>
            Read Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturedProject() {
  return (
    <section className={styles.featuredProject}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Featured Project</Heading>
        <div className={styles.projectCard}>
          <div className={styles.projectImage}>
            <div className={styles.placeholderImage}>
              <span>PCB/Schematic Image</span>
            </div>
          </div>
          <div className={styles.projectContent}>
            <Heading as="h3">eduLAB Synthesis Engine</Heading>
            <p>
              A high-performance audio synthesis engine running on Teensy 4.1, featuring 
              real-time DSP, I2S audio output, and mixed-signal design. This project 
              combines embedded C++ programming with hardware design to create a 
              professional-grade synthesizer.
            </p>
            <div className={styles.techTags}>
              <span className="tech-tag">Teensy 4.1</span>
              <span className="tech-tag">I2S Audio</span>
              <span className="tech-tag">DSP</span>
              <span className="tech-tag">Mixed-Signal</span>
            </div>
            <Link
              className="button button--outline button--primary"
              to="/projects/edulab-synthesis-engine/intro">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentPosts() {
  try {
    const globalData = useGlobalData();
    const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.['default'];
    const blogList = blogPluginData?.blogListPaginated?.items || [];
    
    // Get the 3 most recent posts
    const recentPosts = blogList.slice(0, 3);

    if (recentPosts.length === 0) {
      return (
        <section className={styles.recentPosts}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Recent Posts</Heading>
            <p style={{textAlign: 'center', color: 'var(--ifm-color-emphasis-600)'}}>
              No blog posts yet. Check back soon!
            </p>
            <div className={styles.viewAll}>
              <Link
                className="button button--outline button--primary"
                to="/blog">
                View Blog →
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className={styles.recentPosts}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>Recent Posts</Heading>
          <div className="row">
            {recentPosts.map((post) => {
              const metadata = post.content?.metadata || post.metadata;
              if (!metadata) return null;
              
              return (
                <div key={metadata.permalink} className="col col--4">
                  <article className={styles.postCard}>
                    <Link to={metadata.permalink} className={styles.postLink}>
                      <Heading as="h3">{metadata.title}</Heading>
                      <p>{metadata.description || metadata.excerpt || 'Read more...'}</p>
                      <div className={styles.postMeta}>
                        <time>{new Date(metadata.date).toLocaleDateString()}</time>
                        {metadata.readingTime && (
                          <span> · {Math.ceil(metadata.readingTime)} min read</span>
                        )}
                      </div>
                    </Link>
                  </article>
                </div>
              );
            })}
          </div>
          <div className={styles.viewAll}>
            <Link
              className="button button--outline button--primary"
              to="/blog">
              View All Posts →
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    // Fallback if blog data is not available
    return (
      <section className={styles.recentPosts}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>Recent Posts</Heading>
          <div className={styles.viewAll}>
            <Link
              className="button button--outline button--primary"
              to="/blog">
              View Blog →
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="eduLAB Engineering Blog - Documenting the journey from breadboard to professional hardware design">
      <HomepageHeader />
      <main>
        <FeaturedProject />
        <RecentPosts />
      </main>
    </Layout>
  );
}
