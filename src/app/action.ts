'use server'
 
export async function getCategory(params:string) {
     const res = await fetch(
       `${process.env.NEXT_API_URL}/${params}`,{next:{revalidate:10}}
     );
     return await res.json()
}

export async function getData(slug:string,params:string)
{
  
        console.log(params)
        const res = await fetch(
          `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`);
        return await res.json();
}
 export async function getDirectoryCatagories(params: string) {
     console.log(params);
   const res = await fetch(`${process.env.NEXT_API_URL}/directory?query=${params}`);
   return await res.json();
 }