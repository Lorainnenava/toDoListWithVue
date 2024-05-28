import { AutoMap } from "@automapper/classes";
import { StateResponseDto } from "../../../state/dto/response/stateResponseDto";
import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export class TaskResponseDto {
  @AutoMap()
  public id?: number;

  @AutoMap()
  public idUser?: number;

  @AutoMap()
  public name?: string;

  @AutoMap()
  public description?: string;

  @AutoMap()
  public idState?: number;

  @AutoMap(() => UserResponseDto)
  public user?: UserResponseDto;

  @AutoMap(() => StateResponseDto)
  public state?: StateResponseDto;

  @AutoMap(() => [TagResponseDto])
  public tags?: TagResponseDto[];
}
