import { AutoMap } from "@automapper/classes";

export class UserResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public email?: string;

  @AutoMap()
  public password?: string;

  @AutoMap()
  public state?: number;
}
