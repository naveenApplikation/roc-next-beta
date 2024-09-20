"use client"; // Ensure this component is a client component

import { usePathname } from "next/navigation";

export default function ConditionalCSS() {
  const pathname = usePathname();

  // Disable global CSS for the '/studio' route
  const isStudioRoute = pathname?.startsWith("/studio");
  console.log(isStudioRoute)
  if (isStudioRoute) {
    return null; // Do not render global CSS if it's the studio route
  }

  // Render the global CSS for all other routes
  return (
    <style jsx global>{`
      @import "./globals.css";
    `}</style>
  );
}
