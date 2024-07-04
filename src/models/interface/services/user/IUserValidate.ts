import { Transaction } from "sequelize";

export interface UserValidateServiceInterface {
  /**
   * Maneja la validación de un usuario.
   * @param request {code}
   */
  handle(code: string, t?: Transaction): Promise<boolean>;
}
