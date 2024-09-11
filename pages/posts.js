import axios from 'axios';

// Generate static paths for posts
export async function getStaticPaths() {
  const { data } = await axios.get('http://localhost:1337/posts');
  const paths = data.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: false,  // If fallback is false, any paths not returned by getStaticPaths will result in a 404 page
  };
}

// Fetch individual post data based on slug
export async function getStaticProps({ params }) {
  const { data } = await axios.get(`http://localhost:1337/posts?slug=${params.slug}`);
  return {
    props: {
      post: data[0],  // Assuming slug is unique
    },
  };
}

function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.coverImage.url} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default PostPage;
