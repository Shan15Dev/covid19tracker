import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <h1>Covid Cases in Switzerland</h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
