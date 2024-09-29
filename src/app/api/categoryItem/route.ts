export async function GET() {
  const result = await fetch(`${process.env.NEXT_API_URL}/category-item`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const response = await result.json();

  return Response.json(response);
}
