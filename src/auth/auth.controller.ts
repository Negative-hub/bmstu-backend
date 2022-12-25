import {Post, Body, Controller, HttpCode, HttpException, HttpStatus} from "@nestjs/common";
import {User} from "../entities/user.entity";
import {AuthServices} from "./auth.services";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthServices) {}

    @Post('/login')
    @HttpCode(200)
    async getUser(@Body() userData: LoginUserDto): Promise<User> {
        try {
            return await this.authService.validateUser(userData)
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Пользователь не найден',
            }, HttpStatus.BAD_REQUEST)
        }
    }
}