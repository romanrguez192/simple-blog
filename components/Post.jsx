import Link from "next/link";

export default function Post({ post }) {
  return (
    <>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.excerpt}</p>
      <Link href={"/posts/" + post.slug}>
        <a>Go to</a>
      </Link>
    </>
  );
}
