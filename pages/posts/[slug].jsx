import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Meta from "../../components/Meta";

export default function Post({
  title,
  date,
  cover_image,
  excerpt,
  htmlString,
}) {
  return (
    <>
      <Meta title={title} description={excerpt} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
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
}

export function getStaticProps({ params: { slug } }) {
  // Leer el markdown de los archivos
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  // Obtener el frontmatter y el contenido
  const {
    data: { title, excerpt, date, cover_image },
    content,
  } = matter(markdownWithMeta);

  const htmlString = marked(content);

  return {
    props: {
      title,
      excerpt,
      date,
      cover_image,
      htmlString,
    },
  };
}
