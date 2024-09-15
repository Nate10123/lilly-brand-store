const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const PRINTFUL_API_KEY = '7vRguL8KhUFeRLRWMEdBx4uTOsYremkEkGBHLeCB';

app.use(express.json());

// Proxy route to fetch products from Printful
app.get('/api/products', async (req, res) => {
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
    res.json(data);
  } catch (error) {
    console.error('Error fetching products from Printful:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
