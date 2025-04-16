import { Merriweather,Poppins} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body
        className={`${font_poppins.className}`}
      >
        <Navbar/>
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
