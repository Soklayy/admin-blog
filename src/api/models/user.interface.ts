import { IThumbnail } from "./thumnail.interface";

export interface IUser {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?:string;
    profileImage?:IThumbnail;
    role?:string;
    logginProvider?:string;
    birthdate?:string;
    createdAt?: string;
    updatedAt?: string;
}