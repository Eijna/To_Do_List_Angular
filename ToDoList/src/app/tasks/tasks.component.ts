import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks = TASKS;
  selectedTask?: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

  // On remplit l'objet selectedTask au clic d'une tâche
  onSelect(task: Task): void {
    this.selectedTask = task;
  }

}

