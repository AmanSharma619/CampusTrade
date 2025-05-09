import { Merriweather,Poppins} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import Script from "next/script";
const font_merri = Merriweather({
  variable: "--merri",
  weight: ['300','400', '700'],
  subsets: ["latin"],
});
const font_poppins = Poppins({
  variable: "--merri",
  weight: ['300','400', '700'],
  subsets: ["latin"],
});




export const metadata = {
  title: "CampusTrade",
  description: "Your Campus, Your Marketplace.",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js" strategy="beforeInteractive"/>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js" strategy="beforeInteractive"/>
      </head>
      <body
        className={`${font_poppins.className} overflow-x-hidden`}
      >
        <Provider>
        <Navbar/>
        {children}
        {/* <Footer/> */}
        </Provider>
      </body>
    </html>
  );
}
