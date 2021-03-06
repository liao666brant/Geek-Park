// 封装ls存取token

const key = 'pc-key';

const setToken = (token: string) => {
  return window.localStorage.setItem(key, token);
};

const getToken = () => {
  return window.localStorage.getItem(key);
};

const removeToken = () => {
  return window.localStorage.removeItem(key);
};

export { getToken, removeToken, setToken };
