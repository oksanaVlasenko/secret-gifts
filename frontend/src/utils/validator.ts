import validator from 'validator';

export const validateUrl = (url: string) => {
  return validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true });
};

