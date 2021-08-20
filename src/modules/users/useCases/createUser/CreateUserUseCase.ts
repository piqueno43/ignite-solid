import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyExits = this.usersRepository.findByEmail(email);

    if (emailAlreadyExits) {
      throw new Error("Email already exits");
    }

    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
