import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.frontmatter.title}</h2>
      <p>{post.frontmatter.date}</p>
      <p>{post.frontmatter.excerpt}</p>
      <Link href={"/posts/" + post.slug}>
        <a className="btn">Read more</a>
      </Link>
    </div>
  );
}
