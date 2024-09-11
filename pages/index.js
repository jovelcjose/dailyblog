import axios from 'axios';
import Link from 'next/link';

// Fetch blog posts from Strapi API
export async function getStaticProps() {
  const { data } = await axios.get('http://localhost:1337/posts');
  return {
    props: {
      posts: data,
    },
    revalidate: 10,  // ISR: Revalidate every 10 seconds
  };
}

function HomePage({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
