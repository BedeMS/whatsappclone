import Head from "next/head";  
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
    {/* Head: comes with next.js! it allows us to adjust the information
    inside on pages we want to make changes on.  */}
      <Head>
        <title>Whatsapp 2.0</title>
        <meta name="description" content="Whatsapp 2.0 created with Next.JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* this is our Sidebar component */}
      <Sidebar></Sidebar>
    </div>
  );
}


// in Next js: routing is done for us through the filing system.
// index.js is our home page and any other file will be considered 
// by their file names. If we have a folder in here, its considered a 
// different route. i.e. chat/id

