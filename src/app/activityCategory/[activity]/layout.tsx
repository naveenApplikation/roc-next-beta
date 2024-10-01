import PageLayout from "@/app/pageLayout";
import { CategoryBody } from "@/app/style";
import FilterListModalScreen from "@/components/AllModalScreen/FilterListModalScreen";
import FilterModalScreenEvents from "@/components/AllModalScreen/FilterModalScreenForEvents/Page";
import Categories from "@/components/CategoriesPage/Categories";
import SocialShareModal from "@/components/modal/SocialShareModal";
import { ReactNode } from "react";
import "@/app/globals.css";
import BannerModal from "@/components/bannerModal/page";
import AdsBanner from "@/components/adsBanner/page";
export default async function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLayout>
        <CategoryBody>{children}</CategoryBody>
        
      </PageLayout>
      <Categories></Categories>
      <FilterListModalScreen />
      <FilterModalScreenEvents></FilterModalScreenEvents>
      <SocialShareModal></SocialShareModal>
      <BannerModal />
    </>
  );
}
