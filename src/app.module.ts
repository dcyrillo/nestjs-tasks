import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [TasksModule,
            TypeOrmModule.forRoot(typeOrmConfig),
            AuthModule],
  controllers: [AuthController],

})
export class AppModule {}
