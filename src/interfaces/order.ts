import { PaymentProvider, TransactionStatus } from "../enumerations";
import { IUser } from "./admin";
import { IPlan } from "./plan";
import { IPromo } from "./promo";

export interface IOrder{
    id?: string;
    tid: string;
    success: boolean;
    price: number;
    discount: number;

    user_id: string;
    plan_id: string;
    promo_id: string;

    created_at: Date;
    updated_at: Date;

    user: IUser;
    plan: IPlan;
    promo: IPromo;
    transactions: ITransaction[];
}   


export interface ITransaction{
  id: string
  provider: PaymentProvider
  trans_id: string;
  amount: number;
  prepare_id: number
  perform_time: Date
  cancel_time: Date
  reason: number
  state: number
  status: TransactionStatus
  created_at: Date;
  updated_at: Date;
}