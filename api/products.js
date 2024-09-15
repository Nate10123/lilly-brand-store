import fetch from 'node-fetch';

const PRINTFUL_API_KEY = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products from Printful:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
