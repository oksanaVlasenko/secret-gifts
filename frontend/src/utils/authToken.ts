export const saveTokenAndId = (token: string, id: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('id', id)
  } else {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('id', id)
  }
};

export const clearTokenAndId = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('id');
  sessionStorage.removeItem('id')
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const getId = (): string | null => {
  return localStorage.getItem('id') || sessionStorage.getItem('id')
}
