import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { MyProvider } from "@/app/Context/MyContext";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import ProgressBar from "@/components/ProgressBar";
import ProgressBarProvider from "@/components/ProgressBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "ROC - What's #OnTheROC",
  description: "Your one-stop-shop for what's #OnTheROC.",
  icons:
    "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
  twitter: {
    card: "summary_large_image",
    title: "ROC - What's #OnTheROC",
    description: "Your one-stop-shop for what's #OnTheROC.",
    images:
      "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
  },
  openGraph: {
    images:
      "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        /> */}

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4636767191633754"
          crossOrigin="anonymous"
        ></Script>

        <StyledComponentsRegistry>
          <Toaster position="top-left" reverseOrder={false} />
          <MyProvider>
            <ProgressBarProvider>{children}</ProgressBarProvider>
          </MyProvider>
        </StyledComponentsRegistry>
        <GoogleAnalytics gaId="G-GZWV4V5RKP" />
      </body>
    </html>
  );
}
