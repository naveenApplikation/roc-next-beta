import "@/app/globals.css";
import TrendingList from "@/components/trendingList/page";
import { paramsList } from "../utils";
import NotFound from "@/app/not-found";
export const maxDuration = 300;
interface Props{
     params:{
        listName:string
     }
}
export default async function Page({params}:Props)
{
   let param:any
   if(params.listName.toLowerCase()=="directory")
   {
       param={listName:params.listName}
   }
   else
   {
   

    param=paramsList.find((elem)=>{
       
       return elem.listName.includes(params.listName.replaceAll("%20", " "))
   }) 
}
  console.log(params)
   if(!param)
   {
      return <>
        <NotFound></NotFound>
      </>
   }
   return <>
      <TrendingList urlData={param?.param} urlTitle={param.listName} />  
   </>   
}

export  function generateStaticParams()
{
    return paramsList.map((item)=>{
        return {listName:item.listName}
     })
}


 