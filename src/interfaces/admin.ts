import { StatusType } from "../enumerations";
import { IRole } from "./role";

export interface IAdmin{
    id?: string;
    name: string;
    email: string;
    is_block: boolean;
    role_id: string;

    role?: IRole
}   

export interface IUser{
    id?: string;
    image: string;
    name: string;
    email: string;
    phone: string;
    is_block: boolean;
    status_type: StatusType,
    premium_end_date: Date,
}   
