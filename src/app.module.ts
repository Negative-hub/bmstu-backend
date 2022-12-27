import {CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Task} from "./entities/task.entity";
import {ColumnTask} from "./entities/column.entity";
import {TasksUsers} from "./entities/tasks_users";
import {UsersModule} from "./users/users.module";
import {ColumnsModule} from "./columns/columns.module";
import {TasksModule} from "./tasks/tasks.module";
import {AuthModule} from "./auth/auth.module";
import redisStore from "cache-manager-redis-store";
import type {ClientOpts} from 'redis'

@Module({
    imports: [
        UsersModule,
        ColumnsModule,
        TasksModule,
        AuthModule,
        TypeOrmModule.forFeature([ColumnTask]),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'tealone',
            entities: [User, Task, ColumnTask, TasksUsers],
            synchronize: true,
        }),
        CacheModule.register<ClientOpts>({
            store: redisStore,
            host: '127.0.0.1',
            port: 6379,
            ttl: 0,
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
