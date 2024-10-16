"use client";

import dynamic from "next/dynamic";
import { CategoryBody } from "./ServerStyles";
// client Component:
const EventBox = dynamic(() => import("@/components/eventBox/page"));
const ActivityBox = dynamic(
  () => import("@/components/dashboard/activityBox/page")
);
const ExperienceBox = dynamic(() => import("@/components/experienceBox/page"));
const AttractionBox = dynamic(() => import("@/components/attractionBox/page"));
const Categories = dynamic(() => import("./Categories"));
const HeaderScreen = dynamic(() => import("../header/HeaderScreen"));
import { ApiResponse } from "@/app/utils/types";
import PageLayout from "@/app/pageLayout";
import FilterListModalScreen from "../AllModalScreen/FilterListModalScreen";
import { useMyContext } from "@/app/Context/MyContext";
import SocialShareModal from "../modal/SocialShareModal";
// import { bookmark } from "@/app/utils/ImagePath";
import FilterModalScreenEvents from "../AllModalScreen/FilterModalScreenForEvents/Page";
import { useEffect } from "react";
import { filterEvents } from "../AllModalScreen/FilterModalScreenForEvents/Filters";
import { useRouter } from "next/navigation";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";
import { fallBack } from "@/app/utils/ImagePath";

interface CategoriesPageProps {
  params: string;
  title?: string;
  searchParams: string;
  bookmarkValue: boolean;
  data: any;
  modal?: any;
}
const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
  const {
    showMap,
    socialShare,
    handleSocialShare,
    resetFilters,
    eventFilters,
  } = useMyContext();
  let urlData: any;
  var data: ApiResponse[];
  urlData = props.params
    .toString()
    .replaceAll("%20", " ")
    .replaceAll("%26", " ");
  data = props.data;
  if (props.searchParams == "surfing" || props.searchParams == "ww2") {
    const combinedArray = [...props.data.activity1, ...props.data.activity2];
    data = combinedArray;
  }

  const router = useRouter();

  useEffect(() => {
    resetFilters();

  }, [props.searchParams]);
  useEffect(() => {
    router.prefetch(
      `categories/${props.params}?search=${props.searchParams}`
    );
  }, [props.params, props.searchParams, router])
  data = filterEvents(data, eventFilters);
  const ImageUrlData = data?.map((item: any) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  // console.log(props.params, 42, props.params == "activity-list");
  const categories = () => {
    if (
      props.params === "event-category-list" ||
      props.params == "Events" ||
      props.params === "EventsByDate"
    ) {
      let title = props.title;
      if (props.params === "EventsByDate") {
        title = props.searchParams.toString().replaceAll("%20", " ");
      }
      return (
        <EventBox
          isShare={socialShare}
          urlData={data}
          modal={props.modal}
          bookmarkState={props.bookmarkValue}
          categoryId={props.searchParams}
          urlTitle={title}
          filteredUrls={filteredUrls}
        />
      );
    } else if (props.params == "activity-list") {
      return (
        <ActivityBox
          isShare={socialShare}
          urlData={data}
          bookmarkState={props.bookmarkValue}
          categoryId={props.searchParams}
          urlTitle={props.title}
          filteredUrls={filteredUrls}
          modal={props.modal}
        />
      );
    } else if (urlData === "Enjoy the sunshine") {
      let title = urlData;
      // if (urlData === "EventsByDate") {
      //   title = props.searchParams.toString().replaceAll("%20", " ");
      // }
      return (
        <ExperienceBox
          isShare={socialShare}
          urlData={data}
          urlTitle={title}
          filteredUrls={filteredUrls}
          modal={props.modal}
        />
      );
    } else {
      return (
        <AttractionBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
        />
      );
    }
  };

  return (
    <>
      <PageLayout>
        <CategoryBody title={props.params}>
          <HeaderScreen title={props.params} />
          {categories()}
          <AdsBanner />
        </CategoryBody>
      </PageLayout>
      <Categories></Categories>
      <FilterListModalScreen />
      <FilterModalScreenEvents></FilterModalScreenEvents>
      <SocialShareModal
      ></SocialShareModal>
      <BannerModal />
    </>
  );
};
export default CategoriesPage;

const filterUrls = (ImageUrlData: any) => {
  const imageUrls: string[] = [];
  ImageUrlData?.forEach((item: any) => {
    if (item) {
      try {
        const jsonData = JSON.parse(item);
        const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

        if (
          (url && (url.endsWith(".jpg") || url.endsWith(".png"))) ||
          url.endsWith(".jpeg")
        ) {
          imageUrls.push(url);
        } else {
          imageUrls.push(
            fallBack.src          ); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(
          fallBack.src        ); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(
        fallBack.src      ); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};
