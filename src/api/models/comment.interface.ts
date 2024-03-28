import { IBlog } from "./blog.interface";
import { IUser } from "./user.interface";

export interface IComment{
    id?: string,
    comment?: string,
    user?:IUser,
    blog?: IBlog,
    createdAt?: string,
    updatedAt?: string
}