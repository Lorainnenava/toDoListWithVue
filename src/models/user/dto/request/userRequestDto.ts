import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserRequestDto {
  @IsNumber()
  public id?: number;

  @IsEmail()
  public email?: string;

  @IsString()
  public password?: string;
}
