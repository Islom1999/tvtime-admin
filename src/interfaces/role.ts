import { Permission } from "../enumerations";
import { IAdmin } from "./admin";

export interface IRole{
    id?: string;
    name: string;
    permissions: Permission[];

    admins: IAdmin[]
}   
