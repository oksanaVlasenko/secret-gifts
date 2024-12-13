import { clearTokenAndId } from '@/utils/authToken';

interface HttpError extends Error {
  response?: {
    status?: number;
  };
}

export const handleCatch = (error: unknown): void => {
  if (isHttpError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      clearTokenAndId();
      window.location.href = '/login';
      return;
    }
  }

  console.error(error);

  
};

function isHttpError(error: unknown): error is HttpError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as HttpError).response?.status === 'number'
  );
}
