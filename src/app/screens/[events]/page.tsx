import { getBookMark, getData } from "@/app/action";
import EventList from "@/components/screenPage";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import "@/app/globals.css";
import BannerModal from "@/components/bannerModal/page";
import AdsBanner from "@/components/adsBanner/page";
interface Props {
  params: {
    events: string;
  };
  searchParams: {
    categoryID: string;
  };
}

async function Page({ params, searchParams }: Props) {
  const data = await getData(params.events, searchParams.categoryID);

  const token = cookies().get("loginToken")?.value;

  let bookmark = false;
  if (token) {
    const res = await getBookMark("bookmark");
    const category = params.events
      .toString()
      .replaceAll("%20", " ")
      .replaceAll("%26", " ");
    res?.bookmarks?.forEach((item: any) => {
      if (item.listName.includes(category)) {
        bookmark = true;
      }
    });
  }

  return (
    <>
      <EventList data={data} bookmarkValue={bookmark}></EventList>
      <AdsBanner />
      {/* <BannerModal /> */}
    </>
  );
}

// const params = [
//   "Dine out",
//   "Pubs",
//   "top attraction",
//   "Beach life",
//   "Sustainability",
//   "Heritage",
//   "Cocktail",
//   "Surfing",
// ];

// export async function generateStaticParams() {
//   return params.map((params) => {
//     return { events: params };
//   });
// }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const listName = params.events
    .toString()
    .replaceAll("%20", " ")
    .replaceAll("%26", " ");
  return {
    title: listName,
    description: `Your ultimate guide to ${listName} in Jersey as voted by the community`,
    openGraph: {
      images:
        "https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png",
    },
  };
}
export default Page;
