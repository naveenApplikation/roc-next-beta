export async function getUpcoming(params: string) {
  try {
    const url = `${process.env.NEXT_API_URL}/${params}`;
    const res = await fetch(
      url,
      {
        next: { revalidate: 14400 }, // 4 hours cache duration
      },
    
    ); // 10 seconds timeout for fetch

    if (res.status === 404) {
      console.warn(`Resource not found for ${params}: ${res.statusText}`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      throw new Error("Received content is not JSON");
    }
  } catch (error) {
    console.error("Error fetching category:", params, error);
    return null;
  }
}
