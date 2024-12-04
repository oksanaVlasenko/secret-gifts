const axios = require('axios');
const cheerio = require('cheerio');
const { AppError } = require('../../utils');

const fetchProduct = (url) => {
  return axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  })
    .then((response) => {
      // Перевірка статусу відповіді
      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'No title found';
        const price = $('[itemprop="price"]').attr('content') || $('[class*="price"]').text() || 'No price found';

        // Збираємо всі зображення
        const images = [];
        $('img').each((_, img) => {
          const src = $(img).attr('src');
          if (src) {
            const absoluteSrc = new URL(src, url).href;
            images.push(absoluteSrc);
          }
        });

        // Повертаємо знайдені дані
        return { title, price, images };
      } else {
        console.error('Error: Non-200 response');
        throw new AppError(500, 'Non-200 response from the server');
      }
    })
    .catch((error) => {
      // Обробка помилок
      console.error('Axios error:', error.message || error);
      throw new AppError(500, 'Failed to fetch product data');
    });
};

module.exports = {
  fetchProduct
}