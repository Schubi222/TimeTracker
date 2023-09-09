import type {FieldValue} from "firebase/firestore";

export default interface Entry{
    time: string;
    category: string;
    cause: string;
    date: FieldValue;
    userid: number;
}

export enum sortable {
    category = "category",
    time = "time",
    cause = "cause",
    date = "date",
}