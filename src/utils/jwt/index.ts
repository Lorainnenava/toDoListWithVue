import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class JwtService {
  async create(data: object): Promise<string> {
    try {
      const token = jwt.sign({ data }, process.env.SECRET_KEY as string, {
        expiresIn: "1m",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
