import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

/**
 * Encripta la contraseña.
 * @param contraseña
 * @returns
 */
export const EncryptPassword = async (contraseña: string): Promise<string> => {
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
): Promise<boolean> => {
  return await bcrypt.compare(contraseña, contraseñaRecibida);
};

/**
 * Elimina los metadatos de sequelize y quita el id.
 * @param model
 * @returns
 */
export const PlainWithoutId = <T extends Record<string, any>>(
  obj: T
): Omit<T, "id"> => {
  const { id, ...rest } = obj;
  return rest;
};

/**
 * Crea un código random.
 * @returns
 */
export const CodeRandom = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";
  for (let i = 0; i < 8; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomCode.toUpperCase();
};

/**
 * Maneja el envió de correos.
 * @param mailOptions
 * @param callback
 */
export const HandleEmail = async (
  mailOptions: Mail.Options
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const transporte = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Envía el correo electrónico y maneja cualquier error
    transporte.sendMail(
      { ...mailOptions, from: process.env.EMAIL_FROM },
      (err: Error | null, info: SMTPTransport.SentMessageInfo) => {
        if (err) {
          reject(
            new Error(`Error al enviar el correo electrónico: ${err.message}`)
          );
        } else {
          resolve(info);
        }
      }
    );
  });
};
