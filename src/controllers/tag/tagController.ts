import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Service } from "typedi";
import { TagRequestDto } from "../../models/tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { TagCreateService } from "../../services/tag/tagCreateService";
import { TagDeleteService } from "../../services/tag/tagDeleteService";
import { TagGetAllByIdUserService } from "../../services/tag/tagGetAllByIdUserService";
import { TagGetOneService } from "../../services/tag/tagGetOneService";
import { TagUpdateService } from "../../services/tag/tagUpdateService";

@Service()
@JsonController("tag")
export class TagController {
  /**
   * Constructor
   * @param _tagCreateService - {TagCreateService}
   * @param _tagDeleteService - {TagDeleteService}
   * @param _tagGetAllByIdUserService - {TagGetAllByIdUserService}
   * @param _tagGetOneService - {TagGetOneService}
   * @param _tagUpdateService - {TagUpdateService}
   */
  constructor(
    private _tagCreateService: TagCreateService,
    private _tagDeleteService: TagDeleteService,
    private _tagGetAllByIdUserService: TagGetAllByIdUserService,
    private _tagGetOneService: TagGetOneService,
    private _tagUpdateService: TagUpdateService
  ) {}

  @Post("/create")
  async create(@Body() body: TagRequestDto): Promise<TagResponseDto> {
    return await this._tagCreateService.handle(body);
  }

  @Delete("/delete/:id")
  async delete(@Param("id") id: number): Promise<TagResponseDto> {
    return await this._tagDeleteService.handle(id);
  }

  @Get("/getAllByIdUser/:idUser")
  async getAllByIdUser(
    @Param("idUser") idUser: number
  ): Promise<TagResponseDto[]> {
    return await this._tagGetAllByIdUserService.handle(idUser);
  }

  @Get("/getOne/:id")
  async getOne(@Param("id") idUser: number): Promise<TagResponseDto> {
    return await this._tagGetOneService.handle(idUser);
  }

  @Put("/update/:id")
  async update(
    @Param("id") id: number,
    @Body() body: TagRequestDto
  ): Promise<TagResponseDto> {
    return await this._tagUpdateService.handle(id, body);
  }
}
