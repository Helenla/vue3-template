export enum Mode {
  edit,
  finish
}

export interface TodoItem {
  id: string;
  name: string;
  isDone: boolean;
  iconName: string;
  color: string;
  mode: Mode;
}

export interface State {
  todoList: Array<TodoItem>;
}

export const state: State = {
  todoList: []
};
