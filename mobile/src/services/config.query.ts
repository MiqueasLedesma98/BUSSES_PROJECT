import api from "@/axios.config";

interface ISendConfig {}

export const sendConfig = async (form: ISendConfig) => {
  try {
    await api.put("/config", form);
  } catch (error) {
    console.error(error);
  }
};
