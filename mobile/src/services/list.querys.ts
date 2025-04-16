import api from "@/axios.config";
import {IFetchResponse, IMovie, IPromotion} from "@/interfaces/IFetch";
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

export type TPromotionMeta = {
  type?: "banner" | "video";
  lang?: "eng" | "esp";
  type_banner?:
    | "welcome_banner"
    | "bottom_bar"
    | "left_bar"
    | "carousel_banner";
  limit?: number;
};

export const getPromotion: QueryFunction<IPromotion> = async ({meta}) => {
  try {
    const {type = "banner", lang = "esp", ...rest} = meta as TPromotionMeta;

    const {data} = await api.get(`/list/promotion/${type}/${lang}`, {
      params: rest,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
