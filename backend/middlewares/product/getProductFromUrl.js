const { catchAsync, AppError } = require('../../utils')
const { fetchProduct } = require('../../services/cheerio');
const axios = require('axios');
const cheerio = require('cheerio');

// exports.fetchProductFromUrl = async (req, res, next) => {
//   const { url } = req.body;
//   console.log('URL:', url);

//   if (!url) {
//     return next(new AppError(500, 'URL is required'));
//   }

//   await axios
//     .get(url, {
//       headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         const $ = cheerio.load(response.data);

//         const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'No title found';
//         const price = $('[itemprop="price"]').attr('content') || $('[class*="price"]').text() || 'No price found';

//         const images = [];
//         $('img').each((_, img) => {
//           const src = $(img).attr('src');
//           if (src) {
//             const absoluteSrc = new URL(src, url).href;
//             images.push(absoluteSrc);
//           }
//         });

//         // Зберігаємо результат у req.body для подальшого використання
//         req.body.productData = { title, price, images };

//         next(); // Передаємо управління наступному мідлвару
//       } else {
//         console.error('Error: Non-200 response');
//         throw new AppError(500, 'Failed to fetch product data: Non-200 response');
//       }
//     })
//     .catch((error) => {
//       console.error('Axios error:', error.message);
//       throw new AppError(500, 'Failed to fetch product data');
//     });
// };
// exports.fetchProductFromUrl = catchAsync(async (req, res, next) => {
//   const { url } = req.body;
//   console.log(url, ' fetch ');

//   // Перевірка на успішне отримання даних
//   const data = await fetchProduct(url);
//   console.log(data.title, ' data');
  
//   // Перевірка на наявність усіх необхідних даних
//   if (!data || !data.title || !data.price || !data.images) {
//     console.log('EERRRROEEOEEERF HEEERREEEEE')
//     throw new AppError(500, 'Failed to fetch product data');
//   }

//   // Додавання даних до req.body
//   req.body.title = data.title;
//   req.body.price = data.price;
//   req.body.images = data.images;

//   console.log('next here');
//   next();
// });

exports.fetchProductFromUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return next(new AppError(400, 'URL is required'));
  }

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });

    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        'No title found';

      const rawPrice = $('[itemprop="price"]').attr('content') || $('[class*="price"]').text() || 'No price found';

      // Використовуємо регулярний вираз для вибору числа та символу
      const priceMatch = rawPrice.match(/(\d+[\.,]?\d*)\s?(\D{1,3})/);
      const price = priceMatch ? `${priceMatch[1]} ${priceMatch[2]}` : 'No price found';

      const images = [];
      $('img').each((_, img) => {
        const src = $(img).attr('src');
        if (src && src.endsWith('.jpg')) { // Перевіряємо, чи закінчується на '.jpg'
          const absoluteSrc = new URL(src, url).href;
          images.push(absoluteSrc);
        }
        if (images.length >= 5) { // Зупиняємо перебір після перших 5
          return false; // Перериваємо each
        }
      });

      req.body.productData = { title, price, images };

      return next(); // Передаємо в наступний мідлвар
    } else {
      return next(
        new AppError(500, `Failed to fetch product data: ${response.status}`)
      );
    }
  } catch (error) {
    console.error('Axios error:', error.message);
    return next(new AppError(500, 'Failed to fetch product data'));
  }
};

// exports.fetchProductFromUrl = (req, res, next) => {
//   const { url } = req.body;

//   if (!url) {
//     return next(new AppError(400, 'URL is required'));
//   }

//   axios
//     .get(url, {
//       headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         const $ = cheerio.load(response.data);

//         const title =
//           $('meta[property="og:title"]').attr('content') ||
//           $('title').text() ||
//           'No title found';
//         const price =
//           $('[itemprop="price"]').attr('content') ||
//           $('[class*="price"]').text() ||
//           'No price found';

//         const images = [];
//         $('img').each((_, img) => {
//           const src = $(img).attr('src');
//           if (src) {
//             const absoluteSrc = new URL(src, url).href;
//             images.push(absoluteSrc);
//           }
//         });

//         // Зберігаємо дані в req.body
//         req.body.productData = { title, price, images };

//         // Передаємо управління наступному мідлвару
//         next();
//       } else {
//         return next(
//           new AppError(500, `Failed to fetch product data: ${response.status}`)
//         );
//       }
//     })
//     .catch((error) => {
//       console.error('Axios error:', error.message);
//       return next(new AppError(500, 'Failed to fetch product data'));
//     });
// };

// exports.fetchProductFromUrl = async (req, res, next) => {
//   const { url } = req.body;
//   console.log('URL:', url);

//   if (!url) {
//     throw new AppError(500, 'Failed to fetch product data');
//   }

//   axios
//   .get(url)  // робимо запит до заданого URL
//   .then((response) => {  // якщо запит успішний
//     if (response.status === 200) {  // перевірка статусу відповіді
//       const $ = cheerio.load(response.data);

//       const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'No title found';
//       const price = $('[itemprop="price"]').attr('content') || $('[class*="price"]').text() || 'No price found';
//       //const image = $('meta[property="og:image"]').attr('content') || $('img').attr('src') || 'No image found';

//       const images = [];
//       $('img').each((_, img) => {
//           const src = $(img).attr('src');
          
//           if (src) {
//               const absoluteSrc = new URL(src, url).href;
//               images.push(absoluteSrc);
//           }
//       });

//       console.log(title, ' title 27')
//       req.body.productData = ({ title, price, images });

//       next()
//     } else {
//       console.error('Error: Non-200 response');  // якщо статус відповіді не 200 (OK)
//     }
//   })
//   .catch((error) => {  // обробка помилок, якщо щось пішло не так
//     console.error('Axios error:', error.message);  // виведення повідомлення про помилку
//     throw new Error('Failed to fetch data');  // кидаємо нову помилку
//   });

//   next()
// };