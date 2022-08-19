import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  //ancien code
  //selectedTask?: Task;

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
    //ancien code
    //this.selectedTask = task;
    //this.messageService.add(`TaskComponent: Selected task id={{task.id}}`);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    TASKS.push({ id: 0, name: name, description: '' });

    this.messageService.add(`Task "` + name + `" added`);
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.messageService.add(`Task deleted`);
  }

}

