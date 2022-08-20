import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const tasks = [
      { id: 11, name: 'task 11', description: 'tomatoes' },
      { id: 12, name: 'task 12', description: '' },
      { id: 13, name: 'task 13', description: 'potatoes' },
      { id: 14, name: 'task 14', description: '' },
      { id: 15, name: 'task 15', description: '' },
      { id: 16, name: 'task 16', description: '' },
      { id: 17, name: 'task 17', description: '' },
      { id: 18, name: 'task 18', description: '' },
      { id: 19, name: 'task 19', description: '' }
    ];
    return { tasks };
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  // genId(tasks: Task[]): number {
  //   return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  // }

}
