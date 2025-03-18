import { getAds, getAdsByCategory, getfilteredAdsByCategory } from "@/app/action";
import PageLayout from "@/app/pageLayout";
import AdsBanner from "@/components/adsBanner/page";

export default async function Layout({children}:{children:any})
{

       const arrangingAds =await getfilteredAdsByCategory("directory")
     
    return <>
     <PageLayout>
       {children}
       <AdsBanner adsData={arrangingAds} ></AdsBanner>
     </PageLayout>
     
     
    </>

}