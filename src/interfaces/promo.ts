import { IAdmin } from "./admin"
import { IPlan } from "./plan"

export interface IPromo{
    id:string
    code: string
    discount: number
    is_active: boolean
    count: number
    admin_id: string
    plan_id: string

    plan?: IPlan
    admin?: IAdmin
}