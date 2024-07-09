import { AutoMap } from "@automapper/classes";
import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export class StateResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public name?: string;

  @AutoMap(() => [TaskResponseDto])
  public tasks?: TaskResponseDto[];
}
