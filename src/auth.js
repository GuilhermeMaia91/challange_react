let token = localStorage.getItem('authToken');
let isAuthenticated = token != undefined && token != '' ? true : false;

export const login = () => {
  isAuthenticated = true;
};

export const logout = () => {
  isAuthenticated = false;
};

export const checkAuth = () => {
  return isAuthenticated;
};
