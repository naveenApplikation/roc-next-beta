import { getCategory } from "@/app/action";

import CategorieList from "@/components/categorieList/page";

import DirectoryCategories from "@/components/DirectoryScreen/DirectoryCategories";
import TrendingList from "@/components/trendingList/page";
import ScaffoldingBox from "@/components/scaffoldingBox/page";
import CategoriesPage from "@/components/CategoriesPage/Page";

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

 
const params = [
  "Events",
  "Enjoy the sunshine",
  "Trending Lists",
  "Community",
  "Shopping",
  "Wellbeing"
];

export async function generateStaticParams() {
  return params.map((params) => {
    return {eventName:params};
  });
}

export default Page;
