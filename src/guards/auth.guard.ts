import {Injectable, CanActivate, ExecutionContext, Inject, CACHE_MANAGER} from "@nestjs/common";
import {Cache} from "cache-manager";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const sessionId = request.headers.cookie
            ?.split('; ')
            .find(cookie => cookie.includes('session_id'))
            ?.split('=')[1]

        console.log(sessionId)
        const user = await this.cacheManager.get(sessionId)

        return Boolean(user)
    }
}