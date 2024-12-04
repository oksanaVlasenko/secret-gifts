const { catchAsync, AppError, isValidUrl } = require('../../utils')

exports.checkValidUrl = catchAsync((req, res, next) => {
  const { url } = req.body;

  console.log(url, ' irl', req.body)
  const isValid = isValidUrl(url)
  
  if (!isValid || !url) throw new AppError(400, 'Invalid or missing URL')
    
  next()
})

