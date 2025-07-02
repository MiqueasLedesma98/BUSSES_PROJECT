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

  await api.post(`/promotion/${data?.type}/${data.lang}`, formData);

  return true;
};

export const uploadPublicity = async (values) => {
  const formData = new FormData();

  if (!values.media) throw new Error("No se encuentra el archivo version ");
  if (!values.lang) throw new Error("No el lenguaje es obligatorio");

  formData.append("title", values.title);
  formData.append("media", values.media);

  await api.post(`/promotion/video/${values.lang}`, formData);

  return true;
};

export const createNewEnterprise = async (values) => {
  await api.post("/company", values);
  return "Se ha creado correctamente";
};

export const createNewVersion = async (values) => {
  await api.post("/version", values);
  return "¡Version creada exitosamente!";
};
