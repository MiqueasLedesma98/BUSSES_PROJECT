import api from "@/axios.config";
import {
  IFetchResponse,
  IMovie,
  IPromotion,
  TMovieQuery,
} from "@/interfaces/IFetch";
import {QueryFunction} from "@tanstack/react-query";

export const getMovies: QueryFunction<IFetchResponse<IMovie>> = async ({
  meta,
}) => {
  try {
    const {lang, limit, page} = meta as TMovieQuery;

    const {data} = await api.get(`/list/media/movie/${lang}`, {
      params: {limit, page},
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
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
