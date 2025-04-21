import { defineStore } from 'pinia';
import { IUser } from '../model/user';
export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as IUser,
    }),

    actions:{
      
          setNotification(message: string) {
            this.notificationMessage = message;
          },
          clearNotification() {
            this.notificationMessage = '';
          },
    }
})