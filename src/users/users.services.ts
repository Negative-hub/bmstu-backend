import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {User} from "../entities/user.entity";
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersServices {
    constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>
    ) {}

    // GET ALL USERS
    async getUsers(): Promise<User[]> {
        return this.userRepository.find({
            select: {id: true, name: true, email: true}
        })
    }

    // GET USER BY ID
    async getUser(id: number): Promise<User> {
        return this.userRepository.findOneBy({id})
    }

    // GET USER BY USERNAME
    async getByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({email: username || ''})
    }

    // CREATE USER
    async createUser({password, ...data}: CreateUserDto): Promise<User> {
        const user = await this.getByUsername(data.email)

        if (user) {
            throw new Error('User with that username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const dto = {
            ...data,
            password: hashedPassword,
        }

        const createUser = await this.userRepository.save(dto)
        createUser.password = undefined

        return createUser
    }

    // UPDATE USER
    async updateUser({id, ...data}: UpdateUserDto): Promise<UpdateResult> {
        const user = await this.getUser(id)

        if (user) {
            return this.userRepository.update({id}, {...user, ...data})
        } else {
            return new Promise((resolve, reject) => reject())
        }
    }

    // DELETE USER
    async deleteUser(id: number): Promise<DeleteResult> {
        return this.userRepository.delete({id})
    }
}