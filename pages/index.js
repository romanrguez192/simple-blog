import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  return (
    <>
      <h1>Hello</h1>
      {posts.map((p, i) => (
        <h2 key={i}>{p.frontmatter.title}</h2>
      ))}
    </>
  );
}

export const getStaticProps = () => {
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

  return {
    props: {
      posts,
    },
  };
};
