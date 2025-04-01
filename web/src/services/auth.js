import api from "../api";

export const authenticateUser = async (form) =>
  await api.post("/auth/login", form);
