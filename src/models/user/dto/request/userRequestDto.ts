import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRequestDto {
  @IsNumber()
  public id?: number;

  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  public password?: string;
}
