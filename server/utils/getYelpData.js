const fetch = require('node-fetch');

const getYelpData = async (location, offset) => {
  const url = `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&offset=${offset}&limit=12`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
  });
  const json = await res.json();
  const data = await Promise.all(
    json.businesses.map(async (bar) => {
      const {
        categories,
        id,
        image_url: imageUrl,
        name,
        price = '',
        rating,
        review_count: reviewCount,
        url,
      } = bar;

      return {
        categories,
        id,
        imageUrl,
        name,
        price,
        rating,
        reviewCount,
        url,
      };
    }),
  );

  return data;
};

module.exports = getYelpData;
