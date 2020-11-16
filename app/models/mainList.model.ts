import { SubToDo } from './subtodo.model';

export interface MainList {
  active:boolean;
  deleted:boolean;
  listName:string;
  subItems:SubToDo[]

}
