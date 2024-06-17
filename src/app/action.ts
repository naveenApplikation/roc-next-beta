'use server'
 
export async function getApi(params:string) {
     const res = await fetch(
       `https://beta-dot-roc-app-425011.nw.r.appspot.com/${params}`
     );

     return await res.json()
}

export async function getData(slug:string,params:string)
{
        console.log(params)
        const res = await fetch(
          `https://beta-dot-roc-app-425011.nw.r.appspot.com/category/${params}?type=${slug}`
        );
        return await res.json();
}