export const saveToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};
