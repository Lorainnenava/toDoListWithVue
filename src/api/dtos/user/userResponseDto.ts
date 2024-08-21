/**
 * DTO para la respuesta del usuario.
 */
export class UserResponseDto {
  /**
   * id del usuario
   */
  public id?: number

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
