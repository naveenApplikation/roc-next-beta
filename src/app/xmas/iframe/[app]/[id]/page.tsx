import InfoServerModel from "@/components/AllModalScreen/InfoServerModel";
import { topSideMenu } from "../../../../utils/data";
import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
import XmasIframeModel from "@/app/xmas/XmasComponents/XmasIframeModel";
import { getAds, getCarouselData, getHighlights } from "@/app/xmas/XmasAction";
export const maxDuration = 300;
const data = [
  {
    name: "event",
    iframe_url: "https://hub.roc.je/app/submit-your-event",
  },
  {
    name: "business",
    iframe_url: "https://hub.roc.je/app/submit-your-business",
  },
];
export default async function Page({
  params,
}: {
  params: { app: string; id: string };
}) {
  // // console.log("title",params)
  let filter: any;
  try {
    if (params.app != "profile") {
      const result = await fetch(`${process.env.NEXT_API_URL}/${params.app}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });
      const response = await result.json();
      filter = response.filter((item) => {
        return item._id == params.id;
      });
    } else {
      filter = data.filter((item) => {
        return params.id == item.name;
      });
      // // console.log(filter, "filter");
    }
    return (
      <>
        <XmasIframeModel name="infoApp" title={""}>
          <div style={{ height: "84vh", width: "100%", overflow: "hidden" }}>
            <iframe
              style={{ border: "none", height: "100%", overflow: "hidden" }}
              src={filter[0].iframe_url}
              height="500px"
              width="100%"
              title={""}
              className="iframe_body"
              loading="lazy"
            ></iframe>
          </div>
        </XmasIframeModel>
        <DashBoardModalScreen></DashBoardModalScreen>
      </>
    );
  } catch (error) {
    return <>something went wrong!</>;
  }
}

export async function generateStaticParams() {
  const add = (element: any, type: string) => {
    if (element.link_type == "iframe") {
      staticGeneration.push({ app: type, id: element._id });
    }
  };
  const staticGeneration: any = [];
  const carousel = (await getCarouselData()) as any[];
  carousel.forEach((element) => {
    add(element, "carousel");
  });
  const ads = (await getAds()) as any[];
  ads.forEach((element) => {
    add(element, "advertisement");
  });
  const highlight = (await getHighlights()) as any[];
  highlight.forEach((element) => {
    add(element, "highlight");
  });
  // // console.log(staticGeneration);
  staticGeneration.push(
    { app: "profile", id: "event" },
    { app: "profile", id: "business" }
  );
  // // console.log(staticGeneration);
  return staticGeneration;
}
