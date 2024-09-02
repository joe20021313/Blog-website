import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchBox from "./components/searchbox";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Pagination from "./components/pagination";
import Link from "next/link";

const cache = {
  posts: {},
  totalPosts: {},
};

export default async function PostsPage({ searchParams }) {
  const search = searchParams?.search || "";
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const postsPerPage = 3;

  const fetchTotalPosts = async () => {
    const cacheKey = `totalPosts_${search}`;

    if (cache.totalPosts[cacheKey]) {
      return cache.totalPosts[cacheKey];
    }

    try {
      const response = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/blog49580.wordpress.com/posts?per_page=1${
          search ? `&search=${encodeURIComponent(search)}` : ""
        }`
      );
      const totalPosts = response.headers.get("X-WP-Total");
      const result = totalPosts ? parseInt(totalPosts, 10) : 0;

      cache.totalPosts[cacheKey] = result;

      return result;
    } catch (error) {
      console.error("Error fetching total posts:", error);
      return 0;
    }
  };

  const fetchPosts = async () => {
    const cacheKey = `posts_${currentPage}_${search}`;

    if (cache.posts[cacheKey]) {
      return cache.posts[cacheKey];
    }

    try {
      const response = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/blog49580.wordpress.com/posts?per_page=${postsPerPage}&page=${currentPage}${
          search ? `&search=${encodeURIComponent(search)}` : ""
        }`,
        { cache: "force-cache" }
      );
      const result = await response.json();

      cache.posts[cacheKey] = result;

      return result;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const totalPosts = await fetchTotalPosts();
  const posts = await fetchPosts();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
        }}
      >
        {" "}
        <h1 className="title"
          style={{ textAlign: "center", fontSize: "2rem", paddingTop: "1rem" }}
        >
          Blog Posts
        </h1>
      </div>
      <div >
      <SearchBox />

      </div>
      
      <main className="flex min-h-screen flex-col justify-between p-15">
       
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="posts" style={{ paddingBottom: "1rem" }} key={post.id}>
              <Card className="card" sx={{
                  width: "clamp(300px, 80%, 2000px)",
                  margin: "0 auto", 
                }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title.rendered}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {stripHtmlTags(post.content.rendered)}
                  </Typography>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(128, 128, 128, 0.6)",
                      paddingTop: "0.5rem",
                    }}
                  >
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </CardContent>

                <CardActions>
                  <Button component={Link} href={`/blogpost/${post.id}`}>
                    View Post
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No posts found.
          </Typography>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </div>
  );
}
