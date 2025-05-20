import api from "../api";

export const getMetrics = async ({ meta }) => {
  try {
    const { limit, collection, type } = meta;

    const { data } = await api.get(`/metrics/${collection}/${type}`, {
      params: { limit },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
