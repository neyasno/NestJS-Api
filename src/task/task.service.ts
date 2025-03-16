import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './models/task.model';

@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task)
    private taskModel : typeof Task , 
  ){}

  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      if (!createTaskDto.title || !createTaskDto.description) {
        throw new BadRequestException('Title and description are required');
      }

      const taskData = {
        ...createTaskDto,
        is_completed: false,
        category: createTaskDto.category || 'default',
      };

      const newTask = await this.taskModel.create(taskData);
      return newTask;
      
    } catch (error) {

      if (error.name === 'ValidationError') {
        throw new BadRequestException('Invalid task data');
      }

      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching tasks');
    }
  }

  async findOne(id: number): Promise<Task> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid task ID');
    }

    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async remove(id: number): Promise<{ message: string }> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid task ID');
    }

    const task = await this.findOne(id);
    try {
      await task.destroy();
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting task');
    }
  }
}
