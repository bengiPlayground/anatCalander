import React, { useEffect, useState } from "react";
import Head from "next/head";
import AppBar from "../components/AppBar";
import FullWidthResizer from "../components/Resizer";
import { styled } from "../stitches.config";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Anat Amsalem</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/h2h.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Convergence"
          rel="stylesheet"
        />
      </Head>
      <FullWidthResizer>
        <AppBar />
        <Content>
          <Component {...pageProps} />
        </Content>
      </FullWidthResizer>
    </>
  );
}

const Content = styled("div", {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  paddingTop: "8vh",
  backgroundColor: "$mauve2",
  "@bp1": {},
});

export default MyApp;
