import { Injectable } from '@angular/core'; // Injection de dépendance
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private messageService: MessageService) { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    this.messageService.add('TaskService: fetched tasks');
    return of(TASKS);
  }

  getTask(id: number): Observable<Task> {
    const task = TASKS.find(h => h.id === id)!;
    this.messageService.add(`TaskService: fetched task with id=${id}`);
    return of(task);
  }

}
