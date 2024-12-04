// module.exports = (fn) => (req, res, next) => {
//   fn(req, res, next).catch((err) => next(err))
// }

// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next); // Передаємо помилки через next()
//   };
// }

module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};