import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo-service.service';
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
  todoTitle = "";
  todoDescription = "";
  completed = false;

  addingSubtask = signal<boolean>(false);
  subtaskTitle = "";

  editingSubtaskTitle = "";
  editingSubtaskId: number | null = null;

  ngOnInit() {
    const {completed} = this.todo();
    this.completed = completed;
  }

  // Todos

  onClickEditTodo() {
    this.editingTodo.set(true)
    this.todoTitle = this.todo().title;
    this.todoDescription = this.todo().description;
  }

  onClickSaveEdits() {
    const modifiedTodo = {
      title: this.todoTitle,
      description: this.todoDescription
    }
    this.todoService.patchTodo(modifiedTodo, this.todo().id)
      .subscribe({
        next: todo => {
          this.editingTodo.set(false)
        }
      })
  }

  onClickCancelEditTodo() {
    this.editingTodo.set(false)
  }

  onChangeTodoCompleted(completed: boolean) {
    this.completed = completed;
    this.todoService.patchTodo({completed}, this.todo().id).subscribe();
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
  
    const subtask = this.todo().subtasks.find(subtask => subtask.id == subtaskId)
    if (subtask) {
      this.editingSubtaskTitle = subtask.description
    }
  }

  onClickDeleteSubtask(subtaskId: number) {
    this.todoService.deleteSubtask(subtaskId, this.todo().id).subscribe();
  }

  onClickSaveSubtaskEdits() {
    const subtask = this.todo()
      .subtasks
      .find(subtask => subtask.id == this.editingSubtaskId)

    if (subtask && this.editingSubtaskId) {
      const subtaskRequest = {
        description: this.editingSubtaskTitle, completed: subtask.completed
      }
      this.todoService.patchSubtask(subtaskRequest, this.editingSubtaskId).subscribe({
        next: todo => {
          this.editingSubtaskId = null
        }
      })
    }
  }

  onChangeSubtaskCompleted(subtaskId: number, completed: boolean) {
    this.todoService.patchSubtask({completed}, subtaskId).subscribe();
  }

  onClickCancelEditSubtask() {
    this.editingSubtaskId = null
  }
}
