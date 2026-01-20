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
          Aspiring Hardware Engineer | Building in Public
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
              <img
                src="/img/eduLAB-photo-showcase.jpg"
                alt="eduLAB Synthesis Engine - Hardware Prototype"
                className={styles.projectImageActual}
              />
            </div>
          <div className={styles.projectContent}>
            <Heading as="h3">eduLAB Synthesis Engine</Heading>
            <p>
              A work-in-progress embedded audio project documenting the path from low-level PWM experiments to a future DSP-based synthesis platform.
              Built to explore real-time constraints, hardware–software interaction, and audio signal generation — with an emphasis on learning, measurement, and transparency rather than finished features.
            </p>
            <div className={styles.techTags}>
              <span className="tech-tag">Embedded Systems</span>
              <span className="tech-tag">WIP</span>
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
  const globalData = useGlobalData();
  const data = globalData?.['recent-blog-posts']?.['default'];
  const recentPosts = data?.recentPosts || [];

  if (recentPosts.length === 0) {
    return (
      <section className={styles.recentPosts}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>Recent Posts</Heading>
          <p style={{textAlign: 'center', color: 'var(--ifm-color-emphasis-600)'}}>
            No blog posts yet. Check back soon!
          </p>
          <div className={styles.viewAll}>
            <Link className="button button--outline button--primary" to="/blog">
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
          {recentPosts.map((post) => (
            <div key={post.permalink} className="col col--4">
              <article className={styles.postCard}>
                <Link to={post.permalink} className={styles.postLink}>
                  <Heading as="h3">{post.title}</Heading>
                  <div className={styles.postMeta}>
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.readingTime && (
                      <span> · {post.readingTime} min read</span>
                    )}
                  </div>
                  <p className={styles.postExcerpt}>
                    {post.description || 'Read more...'}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.postTags}>
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className={styles.postTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            </div>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link className="button button--outline button--primary" to="/blog">
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="eduLAB Engineering Blog - Documenting the journey from breadboard to professional hardware design">
      <HomepageHeader />
      <main>
        <FeaturedProject />
        <RecentPosts />
      </main>
    </Layout>
  );
}