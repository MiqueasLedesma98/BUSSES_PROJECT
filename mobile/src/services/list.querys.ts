import api from "@/axios.config";
import {IFetchResponse, IMovie} from "@/interfaces/IFetch";
import {QueryFunction} from "@tanstack/react-query";

export const getMovies: QueryFunction<IFetchResponse<IMovie>> = async ({
  meta,
}) => {
  try {
    const {data} = await api.get("/list/media/movie/all", {
      params: meta,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMusics = async ({page = 1}) => await api.get("/list/music/all");

export const getCategories = async ({queryKey}: {queryKey: string}) => {
  const {data} = await api.get(`/categories/${queryKey[0]}`);

  return data?.results;
};
