/**
 * DTO para la solicitud de usuario.
 */
export class UserRequestDto {
  /**
   * id del usuario
   */
  public id?: number

  /**
   * userName del usuario
   */
  public userName?: string

  /**
   * email del usuario
   */
  public email?: string

  /**
   * password del usuario
   */
  public password?: string

  /**
   * code del usuario
   */
  public code?: string

  /**
   * state del usuario
   */
  public state?: number
}
