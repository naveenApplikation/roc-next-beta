import React from "react";
import PageLayoutClient from "@/components/dashboard/PageLayoutClient";
import { PagelayoutContainer, PagelayoutMainContainer } from "@/app/style";
import ScrollSet from "@/components/dashboard/ScrollSet";

interface PageLayoutProps {
  children: any;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <PagelayoutContainer>
      <PagelayoutMainContainer>{children}</PagelayoutMainContainer>
      <PageLayoutClient />
    </PagelayoutContainer>
  );
};

export default PageLayout;
