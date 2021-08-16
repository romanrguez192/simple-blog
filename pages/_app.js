import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Meta from "../components/Meta";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Meta />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
