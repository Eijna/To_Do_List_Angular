import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  selectedTask?: Task;

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private messageService: MessageService) { //identifie sites d'injection
  }

  ngOnInit(): void {
    this.getTasks();
  }

  // Récupérer les tâches
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  // On remplit l'objet selectedTask au clic d'une tâche
  onSelect(task: Task): void {
    this.selectedTask = task;
    this.messageService.add(`TaskComponent: Selected task id={{task.id}}`);
  }

  onCreate(task: Task): void {

  }

}

