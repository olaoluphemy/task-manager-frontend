import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../requests";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  createdBy?: string;
  _id?: string;
}

interface ResponseMeta {
  page: number;
  limit: number;
  nextPage: number | null;
  totalPages: number;
}

export function createTask(task: Task) {
  return postRequest<Task, { status: string; data: Task }>(task, "tasks");
}

export function getAllTasks(query?: Record<string, string | number>) {
  return getRequest<{
    status: string;
    data: { data: Task[]; meta: ResponseMeta };
  }>("tasks", query);
}

export function updateTask(updatedTask: Task, taskId: string) {
  return patchRequest<Task, { data: { data: Task } }>(
    updatedTask,
    `tasks/${taskId}`,
  );
}

export function deleteTask(taskId: string) {
  return deleteRequest<void>(`tasks/${taskId}`);
}
