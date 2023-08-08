import store from "store";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.clear();
};

export const isLoggedIn = () => {
  return store.getState().auth.isLogged;
};
