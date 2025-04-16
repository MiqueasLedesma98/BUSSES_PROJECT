export interface IFetchResponse<T> {
  total: number;
  results: T[];
  limit: number;
  page: number;
}

export interface IMovie {
  id: string;
  title: string;
  lang?: "esp" | "eng";
  type?: "movie" | "music";
  description?: string;
  cover_path?: string;
  duration?: string;
  rate?: number;
  url_path?: string;
  views?: number;
  year?: string;
}

export interface IPromotion {
  id: string;
  path: string;
  type: "banner" | "video";
  type_banner: "welcome_banner" | "bottom_bar" | "left_bar" | "carousel_banner";
  lang: "esp" | "eng";
  views: number;
  description?: string | null;
  expirationDate: string; // En frontend generalmente las fechas vienen como string ISO
  isActive: boolean;
  createdAt: string; // Sequelize timestamp
  updatedAt: string; // Sequelize timestamp
}
