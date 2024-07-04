import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Service } from "typedi";

@Service()
export class EmailHandle {
  /**
   * Maneja el envió de correos.
   * @param mailOptions
   * @param callback
   */
  async handleEmail(mailOptions: Mail.Options): Promise<unknown> {
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
  }
}
