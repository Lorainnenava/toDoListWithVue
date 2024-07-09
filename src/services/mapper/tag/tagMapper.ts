import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { TagRequestDto } from "../../../models/tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../../models/tag/model/tagModel";

export class TagMapper {
  static defineMapper(): void {
    createMap(mapper, TagRequestDto, Tag);
    createMap(mapper, Tag, TagResponseDto);
    createMap(mapper, TagResponseDto, Tag);
    createMap(mapper, Tag, TagRequestDto);
  }
}
