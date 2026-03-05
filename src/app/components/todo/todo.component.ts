import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
import { Todo, TodoRequest, TodoService } from '../../services/todo-service.service';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [ButtonComponent, CommonModule, FormsModule],
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

  addingSubtask = signal<boolean>(false);
  subtaskTitle = "";
  editingSubtaskTitle = "";
  editingSubtaskId: number | null = null;

  ngOnInit(): void {
    const {title, description, completed} = this.todo();
    this.title.set(title)
    this.description.set(description)
    this.completed.set(completed)
  }

  // Todos

  onClickEditTodo() {
    this.editingTodo.set(true)
  }

  onClickSaveEdits() {
    const modifiedTodo = {
      title: this.title(),
      description: this.description(),
      completed: this.completed()
    }
    this.todoService.patchTodo(modifiedTodo, this.todo().id)
      .subscribe({
        next: todo => {
          this.editingTodo.set(false)
        }
      })
  }

  onClickDeleteTodo() {
    this.todoService.deleteTodo(this.todo().id).subscribe();
  }

  // Subtasks

  onClickAddSubtask() {
    this.subtaskTitle = "";
    this.addingSubtask.set(true);
  }

  onClickCancelAddSubtask() {
    this.addingSubtask.set(false)
  }

  onClickSaveSubtask() {
    const subtaskRequest = {description: this.subtaskTitle, completed: false}
    this.todoService.postSubtask(subtaskRequest, this.todo().id).subscribe({
      next: todo => {
        this.addingSubtask.set(false)
      }
    });
  }

  onClickEditSubtask(subtaskId: number) {
    this.editingSubtaskId = subtaskId
  }

  onClickDeleteSubtask(subtaskId: number) {
    this.todoService.deleteSubtask(subtaskId, this.todo().id).subscribe();
  }

  onClickSaveSubtaskEdits() {

  }
}
