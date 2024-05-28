import { AutoMap } from "@automapper/classes";

export class StateResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public name?: string;

  @AutoMap()
  public color?: string;
}
