import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ TodoService ]
})
export class TodoComponent implements OnInit {
  todoListArray: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
    .subscribe(item => {
      this.todoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.todoListArray.push(x);
      })

      this.todoListArray.sort((a, b) => {
        return a.completed - b.completed;
      })
    });
  }

  onAdd(itemDescription) {
    this.todoService.addTodo(itemDescription.value);
    itemDescription.value = null;
  }

  updateCompleted($key: string, completed) {
    this.todoService.updateTodo($key, !completed);
  }

  onDelete($key: string) {
    this.todoService.removeTodo($key);
  }
}
