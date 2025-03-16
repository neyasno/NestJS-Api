import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports:[SequelizeModule.forFeature([Task])]
})
export class TaskModule {}
