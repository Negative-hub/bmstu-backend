import {Module} from '@nestjs/common';
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
