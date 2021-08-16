import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

export default function Post({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </>
  );
}

export function getStaticPaths() {
  // Leer los archivos de la carpeta posts
  const files = fs.readdirSync(path.join("posts"));

  // Crear las rutas
  const paths = files.map((f) => ({
    params: {
      slug: f.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export function getStaticProps({ params: { slug } }) {
  // Leer el markdown de los archivos
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  // Obtener el frontmatter y el contenido
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
};
