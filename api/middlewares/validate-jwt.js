const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * @template T
 * @typedef {(
 *   req: Request & T,
 *   res: Response,
 *   next: NextFunction
 * ) => void} ExpressController
 */

/**
 * @typedef {Object} propsType
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  validateJWT: async (req, res, next) => {
    try {
      const xtoken = req.header("x-token");
      const ytoken = req.header("y-token");

      if (process.env.BUSS) return next();

      if (ytoken) {
        const { email } = jwt.verify(ytoken, process.env.SECRET_KEY);

        const user = await User.findOne({ where: email });

        if (!user)
          return res.status(401).json({
            msg: "El usuario no existe - Contacte a un administrador",
          });

        req.user = user;
        req.uid = user.id;

        next();
      } else {
        if (!xtoken) return res.status(401).json({ msg: "No autorizado" });

        const { uid } = jwt.verify(xtoken, process.env.SECRET_KEY);

        const user = await User.findByPk(uid);

        if (!user)
          return res.status(401).json({
            msg: "El usuario no existe - Contacte a un administrador",
          });

        req.user = user;
        req.uid = user.id;

        next();
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        msg: "Token invalido",
      });
    }
  },
};
