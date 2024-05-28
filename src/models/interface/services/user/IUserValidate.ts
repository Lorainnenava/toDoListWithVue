export interface UserValidateServiceInterface {
  /**
   * Maneja la validación de un usuario.
   * @param request {code}
   */
  handle(code: string): Promise<boolean>;
}
