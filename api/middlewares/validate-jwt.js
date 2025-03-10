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
    const token = req.header("x-token");

    if (!token) return res.status(401).json({ msg: "No autorizado" });

    try {
      const { uid } = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findByPk(uid);

      if (!user)
        return res
          .status(401)
          .json({ msg: "El usuario no existe - Contacte a un administrador" });

      req.user = user;
      req.uid = user.id;

      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({
        msg: "Token invalido",
      });
    }
  },
};
