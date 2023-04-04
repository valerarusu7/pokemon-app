import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
