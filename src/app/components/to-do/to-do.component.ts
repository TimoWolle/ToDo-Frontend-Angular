import {Component, Input, OnInit} from '@angular/core';
import {todo} from '../../entity/todo'
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit{

  @Input() todo:todo = new todo(0,"","");

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getToDo();
  }

  getToDo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodoByID(id)
      .subscribe(todo => this.todo = todo);
  }

  goBack(): void {
    this.location.back();
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => console.log("user deleted"));
    this.goBack();
  }
}
