import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <a>Simple Blog</a>
        </Link>
      </div>
    </header>
  );
}
