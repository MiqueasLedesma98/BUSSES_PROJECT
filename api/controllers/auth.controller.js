const { generateJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
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
  login: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const user = await User.findOne({
        where: { email },
        attributes: ["id", "email", "password"],
      });

      if (!user) return res.status(401).json({ msg: "El usuario no existe" });

      const isCorrect = await bcrypt.compare(password, user.password);

      if (!isCorrect)
        return res.status(401).json({ msg: "Contraseña incorrecta" });

      const token = await generateJWT(user.id);

      return res.send({ user: user, token });
    } catch (error) {
      next(error);
    }
  },
};
