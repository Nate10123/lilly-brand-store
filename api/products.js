export default async function handler(req, res) {
  const apiKey = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB'; // Your Printful API key

  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    res.status(200).json(data.result);
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    res.status(500).json({ error: 'Error fetching Printful products' });
  }
}
