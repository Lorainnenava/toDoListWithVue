import bcrypt from "bcrypt";

/**
 * Encripta la contraseña.
 * @param contraseña
 * @returns
 */
export const EncryptPassword = async (contraseña: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contraseña, salt);
};

/**
 * Compara dos contraseñas.
 * @param contraseña
 * @param contraseñaRecibida
 * @returns
 */
export const ComparePassword = async (
  contraseña: string,
  contraseñaRecibida: string
) => {
  return await bcrypt.compare(contraseña, contraseñaRecibida);
};
