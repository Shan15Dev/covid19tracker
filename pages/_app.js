import "../styles/globals.css";
import Image from 'next/image'
import Logo from '../public/shanLogoLight.png'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="menu">
        <h1>Covid Cases in Switzerland</h1>
        <Image src={Logo} alt="The Logo of Shan" className="logo"/>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
