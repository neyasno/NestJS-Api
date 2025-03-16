import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { Task } from './task/models/task.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env' ,
      isGlobal : true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER ,
      password: String(process.env.DB_PASS)  ,
      database: process.env.DB_NAME,
      models: [Task],
      autoLoadModels : true , 
      synchronize : true , 
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
  
})

export class AppModule {}
