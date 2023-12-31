import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import {todo} from "../../entity/todo";
import {ActivatedRoute, Router} from "@angular/router";
import {todos} from "../../../todos";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: todo = new todo(0, "", "IN_PROGRESS");

  constructor(
      private todoService: TodoService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    this.checkEdit()
  }
  onSubmit() {
    if(this.todo.id == 0){
      this.todoService.addTodo(this.todo).subscribe()
    }else{
      this.todoService.updateTodo(this.todo).subscribe()
    }

    this.router.navigateByUrl("/todolist")
    //this.todoService.saveTodoToTodos(this.todo);
  }

  checkEdit(){
    let id = Number(this.route.snapshot.paramMap.get('id'))
    if (this.route.snapshot.url.join('/') === 'todo/' + id + '/edit') {
      this.todoService.getTodoByID(id)
        .subscribe(todo => this.todo = todo);
    }
  }
}
