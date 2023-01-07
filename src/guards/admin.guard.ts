import {Injectable, CanActivate, ExecutionContext, Inject, CACHE_MANAGER} from "@nestjs/common";
import {Cache} from "cache-manager";
import {User} from "../entities/user.entity";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const sessionId = request.headers.cookie
            ?.split('; ')
            .find(cookie => cookie.includes('session_id'))
            ?.split('=')[1]

        const userString = await this.cacheManager.get<string>(sessionId)

        if (!userString) {
            return false
        }

        const user: User = JSON.parse(userString)

        return user ? user.is_moderator : false
    }
}