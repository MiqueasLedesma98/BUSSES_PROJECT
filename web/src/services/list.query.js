import api from "../api";

export const getMedia = async ({ meta }) => {
  try {
    const { lang, limit, page, type } = meta;

    const { data } = await api.get(`/list/media/${type}/${lang}`, {
      params: { limit, page },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCategories = async ({ meta }) => {
  try {
    const { data } = await api.get(`/list/category/${meta.type}/${meta.lang}`, {
      params: meta,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getPromotion = async ({ meta }) => {
  try {
    const { type = "banner", lang = "esp", ...rest } = meta;

    const { data } = await api.get(`/list/promotion/${type}/${lang}`, {
      params: rest,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getVersion = async () => {
  try {
    const { data } = await api.get("/version");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEnterprises = async ({ meta }) => {
  const { page } = meta;
  const { data } = await api.get(`/list/company?page=${page}`);
  return data;
};

export const shouldUpdate = async () => {
  const { data } = await api.get("/version/renew");
  return data;
};
