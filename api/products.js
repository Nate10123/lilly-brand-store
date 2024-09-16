import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: 'Bearer 7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.result); // Return only the products array
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
