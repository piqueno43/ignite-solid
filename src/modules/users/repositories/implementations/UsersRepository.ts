import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const mail = this.users.find((mail) => mail.email === email);
    return mail;
  }

  turnAdmin(receivedUser: User): User {
    const administrator = this.users.find(
      (user) => user.id === receivedUser.id
    );
    administrator.admin = true;
    administrator.updated_at = new Date();

    return administrator;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
