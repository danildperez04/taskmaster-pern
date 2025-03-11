import { TaskStatus } from "../../models/task.entity.ts";
import { User } from "../../models/user.entity.ts";

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