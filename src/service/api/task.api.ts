import { ITask } from "../../model/task";
import { CosmoWEB } from "../axios.service";

export class taskApi {

    public static async createTask(params: ITask){
            return await CosmoWEB.post('/task/', params);
        }
    
        public static async getTask(){
            return await CosmoWEB.get('/task/');
        }
    
        public static async updateTask(idTask: number, data: ITask){
            return await CosmoWEB.put(`/task/${idTask}`, data);
        }
    
        public static async deleteTask(idTask: number){
            return await CosmoWEB.delete(`/task/${idTask}`);
        }
    
}