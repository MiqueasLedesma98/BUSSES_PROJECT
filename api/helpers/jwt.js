const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: ({ uid = "", email = "" }) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      if (uid) payload.uid = uid;
      if (email) payload.email = email;

      jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      });
    });
  },
  checkJWT: async (token) => {
    try {
      if (!token || token?.length < 10) return null;

      const { uid } = jwt.verify(token, process.env.SECRET_KEY);

      const user = User.findByPk(uid);

      if (user) return user;
      else return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
