import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const { postid } = params;

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/blog49580.wordpress.com/posts/${postid}`, {
        next: { revalidate: 60 },
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  
  const post = await fetchPost();

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col justify-between p-8">
        <div style={{ paddingBottom: "1rem" }} key={post.id}>
          <Card sx={{   width: "clamp(300px, 100%, 2000px)", }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title.rendered}
              </Typography>
              <p style={{
                 fontSize: "0.8rem",
                 color: "rgba(128, 128, 128, 0.6)"
              }}>{new Date(post.date).toLocaleDateString()}</p>
              <Typography variant="body2" sx={{ color: "text.secondary" }} dangerouslySetInnerHTML={{ __html: post.content.rendered }}>
              </Typography>
            </CardContent>

            <CardActions>
              
              <Button component={Link} href={`/`}>
                Go back
              </Button>
            </CardActions>
          </Card>
        </div>
      </main>
    </div>
  );
}