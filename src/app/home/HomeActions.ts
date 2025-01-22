
export class Home{

    static async fetchWithTimeout(
        resource: string,
        options: any,
        timeout = 15000
      ) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
      
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal,
        });
      
        clearTimeout(id);
        return response;
      }
      
    static async getCategoryListWithIcons(params:string,icons:any)
    {
        try {
            const res = await this.fetchWithTimeout(
              `${process.env.NEXT_API_URL}/${params}?limit=10`,
              {},
              100000
            );
            const response = await res.json();
        
            if (res.status === 200) {
              response.forEach((list: any) => {
                const matchedIcon = icons.find(
                  (icon: any) => icon.name === list.iconName
                );
                if (matchedIcon) {
                  list.image = matchedIcon.image;
                }
              });
              return response;
            } else {
              return [];
            }
          } catch (error) {
            console.error("Error fetching data with icon:", error);
            return [];
          }
    }
}