const { catchAsync, AppError } = require('../../utils')
const { fetchProduct } = require('../../services/cheerio');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

exports.fetchProductFromUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return next(new AppError(400, 'URL is required'));
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

    await page.goto(url, { waitUntil: 'networkidle0' });

    const content = await page.content();

    const $ = cheerio.load(content);

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      'No title found';

    const rawPrice =
      $('[itemprop="price"]').attr('content') ||
      $('[class*="price"]').text() ||
      '';

    const priceMatch = rawPrice.match(/(\d+[\.,]?\d*)\s?(\D{1,3})/);
    const price = priceMatch ? `${priceMatch[1]}` : 0;

    const images = [];

    $('img').each((_, img) => {
      const src = $(img).attr('src');

      if (src && src.endsWith('.jpg')) {
        const absoluteSrc = new URL(src, url).href;
        images.push(absoluteSrc);
      }

      if (images.length >= 5) {
        return false;
      }
    });

    await browser.close();

    req.body.productData = { title, price, images };
    return next();
  } catch (error) {
    console.error('Puppeteer error:', error.message);
    return next(new AppError(500, 'Failed to fetch product data'));
  }
};

// exports.fetchProductFromUrl = async (req, res, next) => {
//   const { url } = req.body;

//   if (!url) {
//     return next(new AppError(400, 'URL is required'));
//   }

//   try {
//     const response = await axios.get(url, {
//       headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
//     });

//     if (response.status === 200) {
//       const $ = cheerio.load(response.data);

//       const title =
//         $('meta[property="og:title"]').attr('content') ||
//         $('title').text() ||
//         'No title found';

//         const rawPrice = $('[itemprop="price"]').attr('content') || $('[class*="price"]').text() || '';

//         // Використовуємо регулярний вираз для вибору числа та символу
//         const priceMatch = rawPrice.match(/(\d+[\.,]?\d*)\s?(\D{1,3})/);
//         // Якщо знаходимо ціну, повертаємо її у відповідному форматі, інакше — 0
//         const price = priceMatch ? `${priceMatch[1]}` : 0;

//       const images = [];

//       $('img').each((_, img) => {
//         const src = $(img).attr('src');

//         if (src && src.endsWith('.jpg')) { 
//           const absoluteSrc = new URL(src, url).href;
//           images.push(absoluteSrc);
//         }

//         if (images.length >= 10) { 
//           return false; 
//         }
//       });

//       req.body.productData = { title, price, images };

//       return next();
//     } else {
//       return next(
//         new AppError(500, `Failed to fetch product data: ${response.status}`)
//       );
//     }
//   } catch (error) {
//     console.error('Axios error:', error.message);
//     return next(new AppError(500, 'Failed to fetch product data'));
//   }
// };
