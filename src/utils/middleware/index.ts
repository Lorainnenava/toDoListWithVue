import dotenv from "dotenv";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

dotenv.config();

export class SessionValidatorMiddleware implements ExpressMiddlewareInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  async use(req: any, res: any, next: (err?: any) => any): Promise<void> {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        try {
          const decoded = jwt.decode(token) as {
            email?: string;
            idUser?: number;
          };

          if (decoded?.idUser) {
            await this._repository.sessionRepository.delete({
              where: { idUser: decoded.idUser },
            });

            return res.status(401).json({ message: "La sesión expiró." });
          } else {
            return res.status(401).json({
              message: "No se pudo obtener el id del usuario del token.",
            });
          }
        } catch (error) {
          throw error;
        }
      }
      if (error instanceof JsonWebTokenError) {
        return res
          .status(401)
          .json({ message: "El token está mal estructurado." });
      }
      if (error instanceof SyntaxError) {
        return res.status(401).json({ message: "Token inesperado." });
      }
      return res.status(500).json({ message: "Error del servidor." });
    }
  }
}
