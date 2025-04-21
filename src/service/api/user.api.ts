import { IUser } from "../../model/user";
import { CosmoWEB } from "../axios.service";

export class RegistreApi {

    public static async createUser(params: IUser){
        return await CosmoWEB.post('/user/', params);
    }

    public static async getUser(){
        return await CosmoWEB.get('/user/');
    }

    public static async updateUser(idUser: number, data: IUser){
        return await CosmoWEB.put(`/user/${idUser}`, data);
    }

    public static async deleteUser(idUser: number){
        return await CosmoWEB.delete(`/user/${idUser}`);
    }

    public static async login(email: string, password: string){
        return await CosmoWEB.post('/user/login/', { email, password });
    }
}