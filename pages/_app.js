import "../styles/globals.css";
import Meta from "../components/Meta";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
