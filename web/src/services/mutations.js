import api from "../api";

export const uploadMovie = async (values) => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("duration", values.duration);
  formData.append("categories", values.categories);
  formData.append("year", values.year);
  formData.append("rate", values.rate);
  formData.append("media", values.media);
  formData.append("cover", values.cover);

  await api.post(`/upload/${values.type}/${values.lang}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    maxBodyLength: Infinity,
  });

  return true;
};

export const uploadPromotion = async ({ values, data }) => {
  const formData = new FormData();

  if (!values.file) throw new Error("No se encuentra el archivo");
  if (!values.secondary)
    throw new Error("No se encuentra el archivo para detalles");

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("media", values.file);
  formData.append("secondary", values.secondary);
  formData.append("type_banner", data.type_banner);

  await api.post(`/promotion/${data?.type}/${values.lang}`, formData);

  return true;
};
