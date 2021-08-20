import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userId = this.usersRepository.findById(user_id);

    if (!userId) {
      throw new Error("User does not exits");
    }

    if (!userId.admin) {
      throw new Error("User not admin");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
