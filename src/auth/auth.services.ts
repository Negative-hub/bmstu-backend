import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {LoginUserDto} from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthServices {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    // LOGIN USER
    async validateUser(loginData: LoginUserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({email: loginData.email});

            const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);

            if (!isPasswordMatching) {
                return new Promise((resolve, reject) => reject(User))
            }
            user.password = undefined;
            return user;
        } catch (error) {
            return new Promise((resolve, reject) => reject(User))
        }
    }
}