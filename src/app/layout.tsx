import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { MyProvider } from "@/app/Context/MyContext";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        <StyledComponentsRegistry>
          <Toaster position="top-left" reverseOrder={false} />
          <MyProvider>{children}</MyProvider>
        </StyledComponentsRegistry>
        <GoogleAnalytics gaId="G-GZWV4V5RKP" />
      </body>
    </html>
  );
}
