import { Component, inject, signal } from '@angular/core';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';
import { Todo, TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-home-page',
  imports: [PageContainerComponent, MainHeaderComponent, BodyContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private todoService = inject(TodoService);
  todos = this.todoService.todos;
  loadingTodos = this.todoService.loadingTodos;
  loadingPostTodos = this.todoService.loadingPostTodo;
}
