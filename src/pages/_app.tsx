import { AuthProvider } from "@context/auth";
import "../styles/globals.scss";
import "../styles/input.css";

function LearningDay({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return getLayout(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default LearningDay;
