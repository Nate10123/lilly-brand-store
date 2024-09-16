export async function GET() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: 'Bearer 7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB',
      },
    });

    // Log the raw response text before JSON parsing
    const rawResponse = await response.text();
    console.log(rawResponse);

    if (!response.ok) {
      return NextResponse.json({ error: `Error: ${response.status}` }, { status: response.status });
    }

    const data = JSON.parse(rawResponse); // Parse after ensuring it's valid JSON
    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
