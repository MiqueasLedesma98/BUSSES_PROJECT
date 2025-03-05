const { User } = require("../models");

module.exports = {
  generateJWT: (uid = "") => {
    return new Promise((resolve, reject) => {
      const payload = { uid: uid.toString() };

      jwt.sign(payload, (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      });
    });
  },
  // TODO: Terminar la función para validar el JWT
  // checkJWT: async (token) => {
  //   try {
  //     if (!token || token?.length < 10) return {};

  //     const {  } =

  //   } catch (error) {
  //     return {};
  //   }
  // },
};
