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
