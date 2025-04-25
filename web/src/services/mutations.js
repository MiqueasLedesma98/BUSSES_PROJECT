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

  await api.post(`/upload/movie/${values.lang}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    maxBodyLength: Infinity,
  });

  return true;
};
