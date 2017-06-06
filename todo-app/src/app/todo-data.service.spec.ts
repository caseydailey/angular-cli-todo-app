/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {Todo} from './todo';
import { TodoDataService } from './todo-data.service';

/*

TestBed is a utility provided by @angular/core/testing
to configure and create an Angular testing module in which we want to run our unit tests.
We use the TestBed.configureTestingModule() method to configure and create a new Angular testing module.
We can configure the testing module to our liking by passing in a configuration object.
This configuration object can have most of the properties of a normal Angular module.

 */
describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });


  //The first argument to the inject function is an array of Angular dependency injection tokens.
  //The second argument is the test function whose parameters are the dependencies that correspond to the dependency injection tokens from the array.
  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', comlete: false});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));

  });

  describe('#save(todo)', () => {

    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));

    describe('#deleteTodoById(id)', () => {
      it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Hello 1', complete: false});
        let todo2 = new Todo({title: 'Hello 2', complete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
        service.deleteTodoById(1);
        expect(service.getAllTodos()).toEqual([todo2]);
        service.deleteTodoById(2);
        expect(service.getAllTodos()).toEqual([]);
      }));

      it('should not remove anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Hello 1', complete: false});
        let todo2 = new Todo({title: 'Hello 2', coplete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
        service.deleteTodoById(3);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
      }));

    });

    describe('#updateTodoById(id, values)', () => {
      it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
        let todo = new Todo({title: 'Hello 1', complete: false});
        service.addTodo(todo);
        let updatedTodo = service.updateTodoById(1, {
          title: 'new title'
        });
        expect(updatedTodo.title).toEqual('new title');
      }));

      it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
        let todo = new Todo({title: 'Hello 1', complete: false});
        service.addTodo(todo);
        let updatedTodo = service.updateTodoById(2, {
          title: 'new title'
        });
        expect(updatedTodo).toEqual(null);
      }));

    });

    describe('#toggleTodoComplete(todo)', () => {

      it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
        let todo = new Todo({title: 'Hello 1', complete: false});
        service.addTodo(todo);
        let updatedTodo = service.toggleTodoComplete(todo);
        expect(updatedTodo.complete).toEqual(true);
        service.toggleTodoComplete(todo);
        expect(updatedTodo.complete).toEqual(false);
      }));

    });

  });

});
