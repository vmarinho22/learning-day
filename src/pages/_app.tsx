import "../styles/globals.scss";
import "../styles/input.css";

function LearningDay({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return getLayout(<Component {...pageProps} />);
}

export default LearningDay;
