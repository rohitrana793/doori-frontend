import api from "./api";

export const loginRequest = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const logoutRequest = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export const getRequest = async (url) => {
  const res = await api.get(url);

  return res.data;
};

export const postRequest = async (url, data) => {
  const res = await api.post(url, data);

  return res.data;
};

export const updateRequest = async (url, data) => {
  const res = await api.put(url, data);

  return res.data;
};

export const deleteRequest = async (url) => {
  const res = await api.delete(url);

  return res.data;
};
