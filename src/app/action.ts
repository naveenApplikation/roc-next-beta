"use server";

export async function getCategory(params: string) {
  const res = await fetch(`${process.env.NEXT_API_URL}/${params}`);
  return await res.json();
}

export async function getData(slug: string, params: string) {
  console.log(params);
  const res = await fetch(
    `${process.env.NEXT_API_URL}/category/${params}?type=${slug}`
  );
  return await res.json();
}

export async function getDirectoryCatagories(params: string) {
  console.log(params);
  const res = await fetch(
    `${process.env.NEXT_API_URL}/directory?query=${params}`
  );
  return await res.json();
}

export async function getApiWithIcon(params: string, icons: any) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/${params}?limit=10`);
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
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getApiShoppingWithIcon(params: string, icons: any) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/${params}?limit=10`);
    const response = await res.json();
    if (res.status === 200) {
      response.forEach((list: any) => {
        const matchedIcon = icons.find(
          (icon: any) => icon.listName === list.listName
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
    console.error("Error fetching data:", error);
    return [];
  }
}
