'use client'

import dynamic from "next/dynamic";
import { CategoryBody } from "./ServerStyles";
// client Component:
const EventBox = dynamic(() => import("@/components/eventBox/page"));
const ExperienceBox = dynamic(() => import("@/components/experienceBox/page"));
const AttractionBox = dynamic(() => import("@/components/attractionBox/page"));
const Categories = dynamic(() => import("./Categories"));
const HeaderScreen = dynamic(() => import("../header/HeaderScreen"));
import { ApiResponse } from "@/app/utils/types";
import PageLayout from "@/app/pageLayout";
import FilterListModalScreen from "../AllModalScreen/FilterListModalScreen";
import { useMyContext } from "@/app/Context/MyContext";


interface CategoriesPageProps {
  params: string,
  searchParams: string,
  data: any
}
const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
  const { showMap } = useMyContext()
  let urlData: any;
  var data: ApiResponse[]
  urlData = props.params.toString().replaceAll("%20", " ").replaceAll("%26", " ");
  data = props.data
  if (props.searchParams == "surfing" || props.searchParams == "ww2") {
    const combinedArray = [
      ...props.data.activity1,
      ...props.data.activity2,
    ];
    data = combinedArray

  }
  const ImageUrlData = data?.map((item: any) => item?.acf?.header_image_data);
  const filteredUrls = filterUrls(ImageUrlData);
  const categories = () => {
    if (props.searchParams === "Family Events" || props.params === "Events") {
      return (
        <EventBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
        />
      );
    } else if (urlData === "Enjoy the sunshine") {

      return (
        <ExperienceBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
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
        <CategoryBody>
          <HeaderScreen />
          {categories()}
        </CategoryBody>
      </PageLayout>
      <Categories></Categories>
      <FilterListModalScreen showMap={showMap} />
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

        if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
          imageUrls.push(url);
        } else {
          imageUrls.push(
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
          ); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(
          "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
        ); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
      ); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};