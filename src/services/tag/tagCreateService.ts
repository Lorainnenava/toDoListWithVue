import { validate } from "class-validator";
import { Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { TagCreateServiceInterface } from "../../models/interface/services/tag/ITagCreateService";
import { TagRequestDto } from "../../models/tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../models/tag/dto/response/tagResponseDto";
import { Tag } from "../../models/tag/model/tagModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class TagCreate
 * @implements {TagCreateServiceInterface}
 */

@Service()
export class TagCreateService implements TagCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *  Maneja la creación de etiquetas.
   * @param request - {TagRequestDto}
   * @returns {Promise<TagResponseDto>}
   */
  async handle(request: TagRequestDto): Promise<TagResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      const createTag = await this._repository.tagRepository.create(request);

      const response = mapper.map(createTag, Tag, TagResponseDto);

      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
