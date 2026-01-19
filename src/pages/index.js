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
  try {
    // Access globalData and find the blog plugin data
    const globalData = useGlobalData();
    
    // Debug: Log all available plugin keys
    console.log('=== BLOG DEBUG ===');
    console.log('All globalData keys:', Object.keys(globalData || {}));
    
    // Try both possible key formats
    const blogPluginData = 
      globalData?.['docusaurus-plugin-content-blog']?.['default'] ||
      globalData?.['@docusaurus/plugin-content-blog']?.['default'];
    
    console.log('blogPluginData:', blogPluginData);
    console.log('blogPluginData keys:', blogPluginData ? Object.keys(blogPluginData) : 'N/A');
    
    // Get blog posts - try both possible property names
    const blogPosts = blogPluginData?.blogPosts || blogPluginData?.posts || [];
    console.log('blogPosts length:', blogPosts.length);
    console.log('First post:', blogPosts[0]);
    console.log('==================');
    
    // Sort by date (newest first) and take top 3
    const recentPosts = blogPosts
      .filter(post => !post.metadata?.unlisted && !post.unlisted)
      .sort((a, b) => {
        const dateA = a.metadata?.date || a.date;
        const dateB = b.metadata?.date || b.date;
        return new Date(dateB) - new Date(dateA);
      })
      .slice(0, 3);

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
              // Handle both data structures: post.metadata or direct properties
              const metadata = post.metadata || post;
              const permalink = metadata.permalink || post.permalink;
              const title = metadata.title || post.title;
              const date = metadata.formattedDate || metadata.date || post.date;
              const readingTime = metadata.readingTime || post.readingTime;
              const description = metadata.description || post.description;
              const tags = metadata.tags || post.tags || [];
              
              if (!permalink) return null;
              
              return (
                <div key={permalink} className="col col--4">
                  <article className={styles.postCard}>
                    <Link to={permalink} className={styles.postLink}>
                      {/* Title */}
                      <Heading as="h3">{title}</Heading>
                      
                      {/* Metadata */}
                      <div className={styles.postMeta}>
                        <time>{typeof date === 'string' && date.includes('T') 
                          ? new Date(date).toLocaleDateString() 
                          : date}</time>
                        {readingTime && (
                          <span> · {Math.ceil(readingTime)} min read</span>
                        )}
                      </div>
                      
                      {/* Excerpt */}
                      <p className={styles.postExcerpt}>
                        {description || 'Read more...'}
                      </p>
                      
                      {/* Tags */}
                      {tags && tags.length > 0 && (
                        <div className={styles.postTags}>
                          {tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className={styles.postTag}>
                              #{typeof tag === 'string' ? tag : tag.label}
                            </span>
                          ))}
                        </div>
                      )}
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
