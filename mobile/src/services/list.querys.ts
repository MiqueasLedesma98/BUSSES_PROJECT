import api from "@/axios.config";
import {
  ICategory,
  IFetchResponse,
  IMovie,
  IPromotion,
  TCategory,
  TMovieQuery,
} from "@/interfaces/IFetch";
import {QueryFunction} from "@tanstack/react-query";

export const getMovies: QueryFunction<IFetchResponse<IMovie>> = async ({
  meta,
}) => {
  try {
    const {lang, limit, page, type, category, search} = meta as TMovieQuery;

    const {data} = await api.get(`/list/media/${type}/${lang}`, {
      params: {limit, page, category, search},
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
    | "carousel_banner"
    | "none";
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

export const getCategories: QueryFunction<IFetchResponse<ICategory>> = async ({
  meta,
}) => {
  try {
    const {lang, type} = meta as TCategory;

    const {data} = await api.get(`/list/category/${type}/${lang}`, {
      params: meta,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
