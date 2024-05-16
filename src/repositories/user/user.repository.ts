import { ModelCtor } from "sequelize-typescript";
import { User } from "../../models/user/user.model";
import { UserRequestDto } from "../../models/user/dto/request/user.request.dto";

export class UserRepository {
  constructor(private _userModel: ModelCtor<User>) {}

  //   async create(request: UserRequestDto): Promise<any> {
  //     try {
  //       const create = await this._userModel.create(request);

  //       return create;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }
}
