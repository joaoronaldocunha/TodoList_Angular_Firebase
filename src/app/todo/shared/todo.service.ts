import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getTodoList() {
    this.todoList = this.firebasedb.list('todos');
    return this.todoList;
  }

  addTodo(description: string) {
    this.todoList.push({
      description: description,
      completed: false
    });
  }

  updateTodo($key: string, flag: boolean) {
    this.todoList.update($key, { completed: flag });
  }

  removeTodo($key: string) {
    this.todoList.remove($key);
  }
}
