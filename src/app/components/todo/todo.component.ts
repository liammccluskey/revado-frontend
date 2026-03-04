import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
import { Todo, TodoRequest, TodoService } from '../../services/todo-service.service';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todo = input.required<Todo>();
  todoService = inject(TodoService);

  editingTodo = signal<boolean>(false);
  expanded = signal<boolean>(false);
  title = signal<string>("");
  description = signal<string>("");
  completed = signal<boolean>(false);

  modifiedTodo = computed<TodoRequest>(() => ({
    title: this.title(),
    description: this.description(),
    completed: this.completed()
  }))

  ngOnInit(): void {
    const {title, description, completed} = this.todo();
    this.title.set(title)
    this.description.set(description)
    this.completed.set(completed)
  }

  onClickEditTodo() {
    this.editingTodo.set(true)
  }

  onClickSaveEdits() {
    this.todoService.patchTodo(this.modifiedTodo(), this.todo().id)
      .subscribe({
        next: todo => {
          this.editingTodo.set(false)
        }
      })
  }

  onClickDeleteTodo() {
    this.todoService.deleteTodo(this.todo().id)
  }
}
