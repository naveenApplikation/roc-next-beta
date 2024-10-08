import InfoServerModel from "@/components/AllModalScreen/InfoServerModel";
import { topSideMenu } from "../../utils/data";
 
import DirectionModalLayout from "@/components//modal/Modal";
 interface props{
    params:{
       app:string
    }
 }
 const formatNameWithSpaces = (name:any) => {
  // Use a regular expression to split the string into words
  // and then join them with spaces
  return name.replace(/([A-Z])/g, ' $1').trim();
};
export default async function Page({params}:props){
 
   try
   {
    
  const result = await fetch(`${process.env.NEXT_API_URL}/nav-links`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
    const response = await result.json();
     
    return <>
         
 
         <InfoServerModel
        name="infoApp"
        title={formatNameWithSpaces(params.app)}
      >
       
          <div style={{ height: "84vh", width: "100%", overflow: 'hidden' }}>
            <iframe
              style={{ border: "none", height: "100%", overflow: "hidden" }}
              src={response.data[0][params.app]}
              height="500px"
              width="100%"
              title={params.app}
              className="iframe_body"
              loading="lazy"
            ></iframe>
          </div>
     
      </InfoServerModel>

     
    </>
}
catch(error)
{ 
    return <>something went wrong!</>
}
  
}


export async function generateStaticParams()
{
    
    return  topSideMenu.map((item)=>{
         return {
             app:item.name
         }
     })
   
}