
import NotFound from "@/app/not-found";
import { ListItem } from "@/components/trendingList/ListItem";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
import { getAds, getAdsByCategory, getDirectoryCategories, getfilteredAdsByCategory } from "@/app/action";
export const maxDuration = 300;
interface Props {
   params: {
      category: string,

   }
}
export default async function Page({ params }: Props) {
   console.log("in places")
   const data = await getDirectoryCategories(params.category.replaceAll("%20", " "));
   if (!data) {
      return <>
         <NotFound></NotFound>
      </>
   }
 const arrangingAds =await getfilteredAdsByCategory("directory")

   return <>

      <ListItem data={data} urlTitle={params.category.replaceAll("%20", " ")}></ListItem>
      <AdsBanner adsData={arrangingAds} />
      <BannerModal />

   </>
}


