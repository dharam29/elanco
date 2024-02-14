import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "@/components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
