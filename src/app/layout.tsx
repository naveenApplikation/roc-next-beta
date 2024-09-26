import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "./registry";
import { MyProvider } from "@/app/Context/MyContext";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import ProgressBarProvider from "@/components/ProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "ROC - Latest from ROC",
  description: "Your one-stop-shop for  Latest from ROC.",
  icons:
    "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
  twitter: {
    card: "summary_large_image",
    title: "ROC - What's #OnTheROC",
    description: "Your one-stop-shop for  Latest from ROC.",
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
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        /> */}
        {/* <link rel="preconnect" href="https://tpc.googlesyndication.com/" /> */}
      </head>
      <body className={inter.className}>
        {/* <Script
          rel="preload"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4636767191633754"
          crossOrigin="anonymous"></Script>

        <Script
          rel="preload"
          type="text/javascript"
          src="https://biosites.ai/js/green-meter.js"
          defer
          async></Script> */}

        <ProgressBarProvider></ProgressBarProvider>
        <StyledComponentsRegistry>
          <Toaster position="top-left" reverseOrder={false} />
          <MyProvider>{children}</MyProvider>
        </StyledComponentsRegistry>
        <GoogleAnalytics gaId="G-GZWV4V5RKP" />
      </body>
    </html>
  );
}
