import { ITask } from "../model/task";
import { taskApi } from "./api/task.api";

export class taskService {

    public static async createTask(params: ITask) {
        return await taskApi.createTask(params);
    }    
          
    public static async getTask() {
        return await taskApi.getTask();
    }
            
    public static async updateTask(idTask: number, data: ITask) {
        return await taskApi.updateTask(idTask, data);
    }
            
    public static async deleteTask(idTask: number) {
        return await taskApi.deleteTask(idTask);
    }

}