import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostItem from "../components/PostItem";

export default function Home({ posts }) {
  return (
    <div className="container">
      <div className="posts">
        {posts.map((p, i) => (
          <PostItem key={i} post={p} />
        ))}
      </div>
    </div>
  );
}

export function getStaticProps() {
  // Leer los archivos de la carpeta posts
  const files = fs.readdirSync(path.join("posts"));

  // Obtener el slug y frontmatter de los posts
  const posts = files.map((f) => {
    // Crear el slug
    const slug = f.replace(".md", "");

    // Obtener el frontmatter
    const markdownWithMeta = fs.readFileSync(path.join("posts", f), "utf-8");
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Ordenar por fecha
  const sortByDate = (a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  };

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
