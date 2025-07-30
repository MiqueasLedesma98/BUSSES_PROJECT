export interface IFetchResponse<T> {
  total: number;
  results: T[];
  limit: number;
  page: number;
}

export type TMovieQuery = {
  lang: "esp" | "eng";
  type: "movie" | "music";
  category?: string;
  search?: string;
  limit?: number;
  page?: 1;
};

export type TCategory = {
  lang: "esp" | "eng";
  type: "movie" | "music";
};

export interface IMovie {
  id: string;
  title: string;
  lang?: "esp" | "eng";
  type?: "movie" | "music";
  description?: string;
  cover_path?: string;
  duration?: string;
  rate?: number;
  Categories?: [ICategory];
  url_path?: string;
  views?: number;
  year?: string;
}

export interface IPromotion {
  id: string;
  path: string;
  title: string;
  type: "banner" | "video";
  type_banner: "welcome_banner" | "bottom_bar" | "left_bar" | "carousel_banner";
  lang: "esp" | "eng";
  path_secondary: string;
  views: number;
  description?: string | null;
  expirationDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type TMediaCategory = {
  MediumId: string;
  CategoryId: string;
};
export interface ICategory {
  id: string;
  name: string;
  media_categories?: TMediaCategory;
}

export interface ICompany {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
