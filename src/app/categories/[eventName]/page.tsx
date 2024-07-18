import { getCategory } from "@/app/action";

import CategorieList from "@/components/categorieList/page";

import DirectoryCategories from "@/components/DirectoryScreen/DirectoryCategories";
import TrendingList from "@/components/trendingList/page";
import ScaffoldingBox from "@/components/scaffoldingBox/page";
import CategoriesPage from "@/components/CategoriesPage/Page";
import { ResolvingMetadata, Metadata } from "next";

interface Props {
  params: {
    eventName: string;
  };
  searchParams: {
    search: string;
  };
}
async function Page({ params, searchParams }: Props) {
  const urlData: any = params.eventName.toString().replaceAll("%20", " ");
  const search: any = searchParams.search;

  if (
    urlData == "Trending Lists" ||
    urlData == "Jerseyisms" ||
    urlData == "Community" ||
    urlData == "Shopping" ||
    urlData == "Wellbeing"
  ) {
    return <TrendingList urlData={search} urlTitle={urlData} />;
  } else if (urlData === "categorieList") {
    return <CategorieList />;
  } else if (search === "Directory") {
    return <DirectoryCategories urlData={urlData} urlTitle={urlData} />;
  } else if (urlData === "Scaffolding") {
    return <ScaffoldingBox />;
  }
  const data = await getCategory(searchParams.search);

  return (
    <>
      <CategoriesPage
        params={params.eventName}
        searchParams={searchParams.search}
        data={data}></CategoriesPage>
    </>
  );
}

const params = ["Enjoy the sunshine", "Community", "Shopping", "Wellbeing"];

export async function generateStaticParams() {
  return params.map((params) => {
    return { eventName: params };
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const listName = params.eventName
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
