const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = async function recentBlogPostsPlugin(context, options) {
  return {
    name: 'recent-blog-posts',
    async loadContent() {
      const blogDir = path.join(context.siteDir, 'blog');
      const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

      const posts = files.map(file => {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        let date = data.date;
        if (!date) {
            const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) date = dateMatch[1];
        }

        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
          title: data.title,
          date: date,
          permalink: data.slug ? `/blog/${data.slug}` : `/blog/${file.replace(/\.mdx?$/, '')}`,
          description: data.description ?? '',
          tags: data.tags ?? [],
          readingTime: readingTime
        };
      })
      .filter(post => post.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

      return posts;
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({recentPosts: content});
    }
  };
};