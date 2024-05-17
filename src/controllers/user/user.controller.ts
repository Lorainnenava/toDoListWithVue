import { UserCreateServiceInterface } from "../../models/interface/services/user/userCreate";

export class UserController {
  constructor(
    private _userCreateServiceInterface: UserCreateServiceInterface
  ) {}
}
