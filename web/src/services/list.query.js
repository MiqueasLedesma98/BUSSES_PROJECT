import api from "../api";

export const getMovies = async ({ page = 1 }) =>
  await api.get("/list/movie/all", { params: { page } });

export const getMusics = async ({ page = 1 }) =>
  await api.get("/list/music/all", { params: { page } });

export const getCategories = async ({ queryKey }) => {
  const { data } = await api.get(`/categories/${queryKey[0]}`);

  return data?.results;
};
