import { api } from "./client";

export const login = (email, password) =>
  api.post(`/users/login`, { email, password });

export const register = (email, name, address, company, password) =>
  api.post("/users/register", { email, name, address, company, password });

export const getEmail = email => api.post("/mail", { email });