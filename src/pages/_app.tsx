import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "../styles/input.css";

function LearningDay({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default LearningDay;
