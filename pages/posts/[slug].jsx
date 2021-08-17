import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Meta from "../../components/Meta";
import styles from "../../styles/Post.module.css";
import ReactMarkdown from "react-markdown";
import { Heading } from "@chakra-ui/react";

export default function Post({ title, date, cover_image, excerpt, markdown }) {
  return (
    <>
      <Meta title={title} description={excerpt} />
      {/* <h1>A title</h1>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <h2>A title</h2>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <h3>A title</h3>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <ol>
        <li>A title</li>
        <li>A second title</li>
        <li>A second title</li>
        <li>A second title</li>
      </ol>
      <ul>
        <li>A title</li>
        <li>A second title</li>
        <li>A second title</li>
        <li>A second title</li>
      </ul>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
      <p>Some text which is really long and bla bla bla aaaaaaaa i don know</p>
     */}
    <ReactMarkdown children={markdown} />
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
    content: markdown,
  } = matter(markdownWithMeta);

  return {
    props: {
      title,
      excerpt,
      date,
      cover_image,
      markdown,
    },
  };
}
