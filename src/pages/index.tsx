import React from "react";
import Head from "next/head";

import Applications from "./applications";

const Home = () => {
  return (
    <>
      <Head>
        <title>Elanco</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Applications />
    </>
  );
};
export default Home;
