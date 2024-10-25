import React from "react";
import PageLayoutClient from "@/components/dashboard/PageLayoutClient";
import { PagelayoutContainer, PagelayoutMainContainer } from "@/app/style";
import ScrollSet from "@/components/dashboard/ScrollSet";
import "@/app/tailwind.css"
interface PageLayoutProps {
  children: any;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-between max-[800px]:flex-col-reverse" data-body-scroll-lock-ignore>
         <div className="h-screen overflow-auto shadow-[0_-8px_40px_0_rgba(0,0,0,0.25)] z-[1] no-scrollbar max-[800px]:h-auto max-[800px]:overflow-hidden max-[800px]:z-10">
          {children}
         </div>
      <PageLayoutClient />
    </div>
  );
};

export default PageLayout;
