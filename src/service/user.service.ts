import { IUser } from "../model/user";
import { RegistreApi } from "./api/user.api";

export class RegisterService {

    public static async createUser(params: IUser) {
        return await RegistreApi.createUser(params);
      }    
      
      public static async getUser() {
          return await RegistreApi.getUser();
        }
        
        public static async updateUser(idUser: number, data: IUser) {
            return await RegistreApi.updateUser(idUser, data);
        }
        
        public static async deleteUser(idUser: number) {
            return await RegistreApi.deleteUser(idUser);
        }
        
        public static async login(email: string, password: string) {
          return await RegistreApi.login(email, password);
        }
}