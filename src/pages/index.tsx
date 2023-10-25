import Head from "next/head";
import App from "@/App";

export default function index() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
      </Head>
      <main>
        <App />
      </main>
    </>
  );
}
