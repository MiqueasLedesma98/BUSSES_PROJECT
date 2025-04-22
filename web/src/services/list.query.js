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
