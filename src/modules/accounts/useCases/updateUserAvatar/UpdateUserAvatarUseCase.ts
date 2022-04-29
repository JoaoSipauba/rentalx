import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string | undefined;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository") 
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists", 500);
        }

        if (!avatar_file) {
            throw new AppError("Avatar file does not exists", 400);
        }

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }