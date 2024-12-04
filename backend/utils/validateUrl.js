const { isURL } = require('validator');

exports.isValidUrl = (url) => {
  console.log(url, 'url')
  return isURL(url, { protocols: ['http', 'https'], require_protocol: true });
};

