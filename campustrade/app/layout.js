import { Geist, Geist_Mono ,Merriweather} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const font_merri = Merriweather({
  variable: "--merri",
  weight: ['300','400', '700'],
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={font_merri.className}
      >
        <Navbar/>
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
