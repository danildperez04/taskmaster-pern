import { TaskStatus } from "../../models/task.entity";
import { User } from "../../models/user.entity";

export class CreateTaskDTO{
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  user: User;
}

export class UpdateTaskDTO{
  id: number;
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date;
  user?: User;
}