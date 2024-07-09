import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TagUpdateServiceInterface } from "../../models/interface/services/tag/ITagUpdateService";
import { TagRequestDto } from "../../models/tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../models/tag/model/tagModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TagUpdate
 * @implements {TagUpdateServiceInterface}
 */

@Service()
export class TagUpdateService implements TagUpdateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la actualización de una etiqueta.
   * @param request - {TagRequestDto}
   * @returns {Promise<TagResponseDto>}
   */
  async handle(id: number, request: TagRequestDto): Promise<TagResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      if (!id) {
        throw new Error("El id es requerido");
      }

      const isTagExist = await this._repository.tagRepository.getOne({
        where: { id },
        transaction,
      });

      if (!isTagExist) {
        throw new Error("Esta etiqueta no existe");
      }

      const createTag = await this._repository.tagRepository.update(request, {
        where: { id },
        transaction,
      });

      const response = mapper.map(createTag, Tag, TagResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
