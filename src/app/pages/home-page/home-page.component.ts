import { Component, inject, signal } from '@angular/core';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';
import { TodoService } from '../../services/todo-service.service';
import { TodoComponent } from '../../components/todo/todo.component';
import { AuthService } from '../../services/auth-service.service';
import { ButtonComponent } from "../../components/button/button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [PageContainerComponent, MainHeaderComponent, BodyContainerComponent, TodoComponent, ButtonComponent, FormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private todoService = inject(TodoService);
  private authService = inject(AuthService)
  todos = this.todoService.todos;
  loadingTodos = this.todoService.loadingTodos;
  loadingPostTodos = this.todoService.loadingPostTodo;

  addingTodo = signal<boolean>(false);
  

  // Form Data
  todoTitle = "";
  todoDescription = "";
  
  onClickCreateTodo() {
    this.addingTodo.set(true)
  }

  onClickCancelCreateTodo() {
    this.addingTodo.set(false)
  }

  onClickSaveTodo() {
    const todoRequest = {
      title: this.todoTitle, 
      description: this.todoDescription, 
      completed: false
    };

    this.todoService.postTodo(todoRequest).subscribe({
      next: todo => {
        console.log(todo)
        this.addingTodo.set(false)
        this.todoTitle = ""
        this.todoDescription = ""
      }
    })
  }
}
