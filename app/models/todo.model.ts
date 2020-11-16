import { SubToDo } from './subtodo.model'
import { MainList } from "./mainList.model";

export interface Todo {
  creator:string;
  activityName:string;
  date:any;
  description:string;
  active:boolean;
  _id:string;
  modifiedBy:string;
  deleted:boolean;
  mainlist:MainList[]
}
