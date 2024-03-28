import { IComment } from "./comment.interface";
import { IThumbnail } from "./thumnail.interface";

export interface IBlog {
    id?: string;
    title?: string;
    description?: string;
    article?: string;
    isPublic?: boolean;
    thumbnail?: IThumbnail;
    comment?: IComment[];
    like?: number;
    createdAt?: string;
    updatedAt?: string;
}