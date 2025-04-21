import { EPriorite } from "../constant/enum";

export interface ITask{
    idTask?: number,
    title: string,
    description: string,
    priorite: EPriorite,
    date_echeance: Date | string,
}