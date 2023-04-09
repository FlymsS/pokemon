import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { NavBar } from "../UI";

interface Props {
  title?: string;
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Donovan Jiménez" />
        <meta name="description" content="Pokemon App" />
        <meta
          name="keywords"
          content="pokemon, app, nextjs, react, typescript"
        />

        <meta
          property="og:title"
          content={`Información sobre el pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la información sobre ${title}`}
        />
        <meta
          property="og:image"
          content={`${origin}/images/baner.png`}
        />
      </Head>
      <NavBar />
      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </> 
  );
};
