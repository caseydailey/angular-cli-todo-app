import { Component } from '@angular/core';
//import calss so we can register it as dependency injection token
import {TodoDataService} from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  // <input class="new-todo" placeholder="What needs to be done?" autofocus="" [(ngModel)]="newTodo.title" (keyup.enter)="addTodo()">
  // this is the model for the input in the view
  newTodo: Todo = new Todo();

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token 'ToDoDataService'
  // and assign it to a property called 'todoDataService'
  // The use of public or private on arguments in the constructor is a shorthand notation
  // that allows us to automatically create properties with that name
  constructor(private todoDataService: TodoDataService) {
  }

  //service is now available as this.todoDataService

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo){
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

}
