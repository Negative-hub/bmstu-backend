import {
    Post,
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    CACHE_MANAGER,
    Inject,
    Res
} from "@nestjs/common";
import {Cache} from "cache-manager";
import {AuthServices} from "./auth.services";
import {LoginUserDto} from "./dto/login-user.dto";
import { v4 as uuidv4 } from 'uuid';
import {Response} from "express";

@Controller('/api/auth')
export class AuthController {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly authService: AuthServices
    ) {}

    @Post('/login')
    @HttpCode(200)
    async getUser(@Body() userData: LoginUserDto, @Res({passthrough: true}) response: Response) {
        try {
            const user = await this.authService.validateUser(userData)

            const uuid = uuidv4()
            await this.cacheManager.set(uuid, `${user}`, {ttl: 0})

            response.cookie('session_id', uuid, {httpOnly: true, secure: true, sameSite: 'none'})

            return user
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Пользователь не найден',
            }, HttpStatus.BAD_REQUEST)
        }
    }
}