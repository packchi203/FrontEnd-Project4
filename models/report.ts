import { Account } from "./account";

export interface Comment {
     id:number
     account:Account
     reason:string
     reportStatus:string
     reportType:string
     createdAt:string
}